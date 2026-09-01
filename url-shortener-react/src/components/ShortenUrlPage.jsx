import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ShortenUrlPage = () => {
  const { url } = useParams();

  useEffect(() => {
    if (!url) {
      return;
    }

    const backendUrl =
      import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "");

    const redirectUrl = `${backendUrl}/${url}`;

    console.log("Short URL:", url);
    console.log("Redirecting to:", redirectUrl);

    window.location.replace(redirectUrl);
  }, [url]);

  return (
    <div className="min-h-screen flex justify-center items-center">

      <div className="text-center">

        <h1 className="text-xl font-semibold text-slate-800">
          Redirecting...
        </h1>

        <p className="text-slate-500 mt-2">
          Please wait...
        </p>

      </div>

    </div>
  );
};

export default ShortenUrlPage;