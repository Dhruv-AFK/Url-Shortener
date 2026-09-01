import { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "./TextField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import { useStoreContext } from "../ContextApi/ContextApi";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loader, setLoader] = useState(false);

  const { setToken } = useStoreContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const loginHandler = async (data) => {
    setLoader(true);

    try {
      const { data: response } = await api.post(
        "/api/auth/public/login",
        data
      );

      console.log(response.token);

      // Save token in Context
      setToken(response.token);

      // Save token in localStorage
      localStorage.setItem(
        "JWT_TOKEN",
        JSON.stringify(response.token)
      );

      toast.success("Login Successful!");

      reset();

      navigate(location.state?.from ?? "/dashboard", { replace: true });

    } catch (error) {
      console.log(error);
      toast.error("Login Failed!");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-gray-50 py-10">

      <form
        onSubmit={handleSubmit(loginHandler)}
        className="sm:w-[450px] w-[360px] bg-white border border-gray-300 shadow-md py-8 sm:px-8 px-4 rounded-lg"
      >

        {/* Heading */}
        <h1 className="text-center font-serif text-slate-900 font-bold lg:text-3xl text-2xl">
          Login Here
        </h1>

        {/* Divider */}
        <hr className="mt-3 mb-5 border-gray-300" />

        {/* Form fields */}
        <div className="flex flex-col gap-3">

          <TextField
            label="UserName"
            required
            id="username"
            type="text"
            message="*Username is required"
            placeholder="Type your username"
            register={register}
            errors={errors}
          />

          <TextField
            label="Password"
            required
            id="password"
            type="password"
            message="*Password is required"
            placeholder="Type your password"
            register={register}
            min={6}
            errors={errors}
          />

        </div>

        {/* Login button */}
        <button
          disabled={loader}
          type="submit"
          className="w-full bg-slate-900 text-white font-semibold py-3 px-4 rounded-md mt-5 hover:bg-slate-800 disabled:bg-gray-400 transition-colors duration-200"
        >
          {loader ? "Loading..." : "Login"}
        </button>

        {/* Register link */}
        <p className="text-center text-sm text-slate-700 mt-6">
          Don't have an account?{" "}

          <Link
            className="font-semibold underline text-slate-900 hover:text-blue-600 transition-colors"
            to="/register"
          >
            SignUp
          </Link>

        </p>

      </form>
    </div>
  );
};

export default LoginPage;
