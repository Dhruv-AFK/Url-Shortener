import { useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

import { useStoreContext } from "../../ContextApi/ContextApi";
import { useCreateShortUrl } from "../../hooks/useQuery";

const ShortenPopUp = ({ open, setOpen, refetch }) => {
  const { token } = useStoreContext();

  const [originalUrl, setOriginalUrl] = useState("");

  const createShortUrl = useCreateShortUrl(token);

  if (!open) return null;

  const close = () => {
    setOriginalUrl("");
    createShortUrl.reset();
    setOpen(false);
  };

  const submit = async (event) => {
    event.preventDefault();

    if (!originalUrl.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    try {
      const result = await createShortUrl.mutateAsync(
        originalUrl.trim()
      );

      console.log("Created short URL:", result);

      // Refresh dashboard URL list
      if (refetch) {
        await refetch();
      }

      // Copy shortened URL
      const shortUrl = `${import.meta.env.VITE_BACKEND_URL}/${result.shortUrl}`;

      await navigator.clipboard.writeText(shortUrl);

      toast.success("Short URL created successfully!");

      close();

    } catch (error) {
      console.error("Create Short URL Error:", error);

      toast.error(
        error?.response?.data?.message ||
        "Could not create the short URL"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

      <form
        onSubmit={submit}
        className="sm:w-[450px] w-[360px] relative bg-white shadow-lg pt-8 pb-5 sm:px-8 px-4 rounded-lg"
      >

        {/* Close button */}
        <button
          type="button"
          onClick={close}
          className="absolute right-2 top-2"
          aria-label="Close"
        >
          <RxCross2 className="text-slate-800 text-3xl" />
        </button>

        {/* Heading */}
        <h1 className="font-montserrat text-center font-bold sm:text-2xl text-[22px] text-slate-800">
          Create New Shorten URL
        </h1>

        <hr className="mt-2 mb-5 border-gray-300" />

        {/* Input */}
        <label
          htmlFor="originalUrl"
          className="font-semibold text-md text-slate-800"
        >
          Enter URL
        </label>

        <input
          id="originalUrl"
          type="url"
          required
          value={originalUrl}
          onChange={(event) =>
            setOriginalUrl(event.target.value)
          }
          placeholder="https://example.com"
          className="mt-1 w-full px-3 py-2 border border-slate-400 outline-none bg-white text-slate-700 rounded-md focus:border-slate-900"
        />

        {/* Create button */}
        <button
          disabled={createShortUrl.isPending}
          type="submit"
          className="bg-slate-900 font-semibold text-white w-32 py-2 transition-colors rounded-md my-4 hover:bg-slate-800 disabled:opacity-60"
        >
          {createShortUrl.isPending
            ? "Creating..."
            : "Create"}
        </button>

      </form>

    </div>
  );
};

export default ShortenPopUp;