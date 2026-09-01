import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import TextField from "./TextField";
import api from "../api/api";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

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

  const registerHandler = async (data) => {
    setLoader(true);

    try {
      await api.post(
        "/api/auth/public/register",
        data
      );

      reset();
      navigate("/login");

      toast.success("Registration Successful!");
    } catch (error) {
      console.log(error);
      toast.error("Registration Failed!");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-gray-50 py-10">

      <form
        onSubmit={handleSubmit(registerHandler)}
        className="sm:w-[450px] w-[360px] bg-white border border-gray-300 shadow-md py-8 sm:px-8 px-4 rounded-lg"
      >

        {/* Heading */}
        <h1 className="text-center font-serif text-slate-900 font-bold lg:text-3xl text-2xl">
          Register Here
        </h1>

        {/* Heading underline */}
        <hr className="mt-3 mb-5 border-gray-300" />

        {/* Input fields */}
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
            label="Email"
            required
            id="email"
            type="email"
            message="*Email is required"
            placeholder="Type your email"
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

        {/* Register button */}
        <button
          disabled={loader}
          type="submit"
          className="w-full bg-slate-900 text-white font-semibold py-3 px-4 rounded-md mt-5 hover:bg-slate-800 disabled:bg-gray-400 transition-colors duration-200"
        >
          {loader ? "Loading..." : "Register"}
        </button>

        {/* Login link */}
        <p className="text-center text-sm text-slate-700 mt-6">
          Already have an account?{" "}
          <Link
            className="font-semibold underline text-slate-900 hover:text-blue-600 transition-colors"
            to="/login"
          >
            Login
          </Link>
        </p>

      </form>
    </div>
  );
};

export default RegisterPage;
