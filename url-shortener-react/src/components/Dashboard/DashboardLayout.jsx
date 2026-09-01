import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLink } from "react-icons/fa";

import Graph from "./Graph";
import ShortenPopUp from "./ShortenPopUp";
import ShortenUrlList from "./ShortenUrlList";

import { useStoreContext } from "../../ContextApi/ContextApi";

import {
  useFetchMyShortUrls,
  useFetchTotalClicks,
} from "../../hooks/useQuery";


const DashboardLayout = () => {
  const navigate = useNavigate();

  const { token } = useStoreContext();

  const [shortenPopUp, setShortenPopUp] = useState(false);


  // ==========================================
  // Fetch user's short URLs
  // ==========================================

  const {
    data: myShortenUrls = [],
    isLoading: urlsLoading,
    isError: urlsError,
    error: urlsErrorData,
    refetch,
  } = useFetchMyShortUrls(token);


  // ==========================================
  // Fetch total clicks
  // ==========================================

  const {
    data: totalClicks = [],
    isLoading: clicksLoading,
    isError: clicksError,
    error: clicksErrorData,
  } = useFetchTotalClicks(token);


  // ==========================================
  // Check login
  // ==========================================

  if (!token) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center items-center bg-gray-50 px-4">

        <h1 className="text-3xl font-bold text-slate-800">
          Please Login First
        </h1>

        <p className="text-slate-600 mt-2">
          You need to login to access your dashboard.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-5 bg-slate-900 text-white px-6 py-3 rounded-md font-semibold hover:bg-slate-800"
        >
          Go to Login
        </button>

      </div>
    );
  }


  // ==========================================
  // Loading
  // ==========================================

  if (urlsLoading || clicksLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-gray-50">

        <div className="text-center">

          <div className="w-10 h-10 border-4 border-gray-300 border-t-slate-900 rounded-full animate-spin mx-auto">
          </div>

          <p className="mt-4 text-slate-700 font-semibold">
            Loading Dashboard...
          </p>

        </div>

      </div>
    );
  }


  // ==========================================
  // API Error
  // ==========================================

  if (urlsError || clicksError) {
    console.error(
      "Dashboard API Error:",
      urlsErrorData || clicksErrorData
    );

    return (
      <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-gray-50 px-4">

        <div className="bg-white border border-red-200 shadow-md rounded-lg p-8 max-w-lg w-full text-center">

          <h1 className="text-2xl font-bold text-red-600">
            Unable to Load Dashboard
          </h1>

          <p className="text-slate-600 mt-3">
            There was a problem connecting to the server.
          </p>

          <p className="text-sm text-red-500 mt-2 break-all">
            {urlsErrorData?.message ||
              clicksErrorData?.message ||
              "Something went wrong."}
          </p>

          <div className="flex justify-center gap-3 mt-6">

            <button
              onClick={() => window.location.reload()}
              className="bg-slate-900 text-white px-5 py-2 rounded-md hover:bg-slate-800"
            >
              Try Again
            </button>

            <button
              onClick={() => navigate("/")}
              className="border border-slate-900 text-slate-900 px-5 py-2 rounded-md hover:bg-slate-900 hover:text-white"
            >
              Home
            </button>

          </div>

        </div>

      </div>
    );
  }


  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 lg:px-14 sm:px-8 px-4">

      <div className="lg:w-[90%] w-full mx-auto py-10">


        {/* ==========================================
            DASHBOARD HEADER
        =========================================== */}

        <div className="mb-8">

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-slate-600 mt-2">
            Manage your short URLs and track their performance.
          </p>

        </div>


        {/* ==========================================
            ANALYTICS CARD
        =========================================== */}

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-5">

          <div className="mb-4">

            <h2 className="text-xl font-bold text-slate-800">
              Link Analytics
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Track clicks on your shortened URLs.
            </p>

          </div>


          <div className="h-96 relative">

            {totalClicks.length === 0 ? (

              <div className="absolute inset-0 flex flex-col justify-center items-center text-center">

                <h1 className="text-slate-800 font-serif text-xl sm:text-2xl font-bold">
                  No Data For This Time Period
                </h1>

                <p className="max-w-md mt-2 text-sm sm:text-base text-slate-600">
                  Share your short links to view where your engagements are
                  coming from.
                </p>

              </div>

            ) : (

              <Graph graphData={totalClicks} />

            )}

          </div>

        </div>


        {/* ==========================================
            CREATE SHORT URL BUTTON
        =========================================== */}

        <div className="py-6 flex justify-end">

          <button
            onClick={() => setShortenPopUp(true)}
            className="bg-custom-gradient px-5 py-3 rounded-md text-white font-semibold shadow-md hover:opacity-90 transition"
          >
            Create a New Short URL
          </button>

        </div>


        {/* ==========================================
            YOUR SHORT URLS
        =========================================== */}

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-5">

          <div className="flex items-center gap-3 mb-5">

            <h2 className="text-2xl font-bold text-slate-800">
              Your Short URLs
            </h2>

            <FaLink className="text-blue-500 text-xl" />

          </div>


          {/* ==========================================
              NO SHORT URLS
          =========================================== */}

          {myShortenUrls.length === 0 ? (

            <div className="flex justify-center py-12">

              <div className="text-center">

                <FaLink className="text-blue-500 text-4xl mx-auto mb-4" />

                <h3 className="text-lg font-semibold text-slate-800">
                  You haven't created any short link yet
                </h3>

                <p className="text-slate-500 mt-2">
                  Create your first short URL using the button above.
                </p>

              </div>

            </div>

          ) : (

            /* ==========================================
               SHORT URL LIST
            =========================================== */

            <ShortenUrlList
              data={myShortenUrls}
            />

          )}

        </div>

      </div>


      {/* ==========================================
          CREATE SHORT URL POPUP
      =========================================== */}

      <ShortenPopUp
        refetch={refetch}
        open={shortenPopUp}
        setOpen={setShortenPopUp}
      />

    </div>
  );
};


export default DashboardLayout;