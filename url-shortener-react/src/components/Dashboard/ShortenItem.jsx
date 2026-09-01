import { useState } from "react";
import toast from "react-hot-toast";

import {
  FaExternalLinkAlt,
  FaRegCalendarAlt,
} from "react-icons/fa";

import { IoCopy } from "react-icons/io5";
import { LiaCheckSolid } from "react-icons/lia";

import {
  MdAnalytics,
  MdOutlineAdsClick,
} from "react-icons/md";

import api from "../../api/api";
import { useStoreContext } from "../../ContextApi/ContextApi";
import Graph from "./Graph";

const ShortenItem = ({
  originalUrl,
  shortUrl,
  clickCount,
  createdDate,
}) => {
  const { token } = useStoreContext();

  const [isCopied, setIsCopied] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [analyticsData, setAnalyticsData] = useState([]);

  // React short URL
  const shortLink = `${window.location.origin}/s/${shortUrl}`;

  // ==========================================
  // OPEN SHORT URL
  // ==========================================

  const openShortLink = () => {
    window.open(shortLink, "_blank", "noopener,noreferrer");
  };

  // ==========================================
  // COPY
  // ==========================================

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shortLink);

      setIsCopied(true);

      toast.success("Short URL copied to clipboard");

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy error:", error);
      toast.error("Could not copy short URL");
    }
  };

  // ==========================================
  // ANALYTICS
  // ==========================================

  const loadAnalytics = async () => {
    if (showAnalytics) {
      setShowAnalytics(false);
      return;
    }

    setLoadingAnalytics(true);

    const end = new Date();
    const start = new Date();

    start.setDate(end.getDate() - 30);

    const format = (date, lastMoment = false) =>
      `${date.toISOString().slice(0, 10)}T${
        lastMoment ? "23:59:59" : "00:00:00"
      }`;

    try {
      const { data } = await api.get(
        `/api/urls/analytics/${shortUrl}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          params: {
            startDate: format(start),
            endDate: format(end, true),
          },
        }
      );

      setAnalyticsData(data);
      setShowAnalytics(true);
    } catch (error) {
      console.error("Analytics error:", error);
      toast.error("Could not load link analytics");
    } finally {
      setLoadingAnalytics(false);
    }
  };

  return (
    <div className="bg-slate-100 shadow-lg border border-dotted border-slate-500 px-6 sm:py-1 py-3 rounded-md">

      {/* ==========================================
          MAIN CONTENT
      =========================================== */}

      <div className="flex sm:flex-row flex-col sm:justify-between w-full gap-5 py-5">

        {/* LEFT SIDE */}

        <div className="flex-1 min-w-0">

          {/* SHORT URL */}

          <div className="flex items-center gap-2 mb-2">

            <button
              type="button"
              onClick={openShortLink}
              className="text-left text-[17px] font-semibold text-blue-600 hover:underline break-all cursor-pointer"
            >
              {shortLink}
            </button>

            <FaExternalLinkAlt className="text-blue-600 flex-shrink-0" />

          </div>

          {/* ORIGINAL URL */}

          <div className="text-slate-700 text-[17px] break-all">
            {originalUrl}
          </div>

          {/* CLICKS + DATE */}

          <div className="flex items-center gap-8 pt-6 flex-wrap">

            <div className="flex gap-1 items-center font-semibold text-green-800">

              <MdOutlineAdsClick className="text-[22px] mr-1" />

              <span>
                {clickCount || 0}
              </span>

              <span>
                {clickCount === 1 ? "Click" : "Clicks"}
              </span>

            </div>

            <div className="flex items-center gap-2 font-semibold text-lg text-slate-800">

              <FaRegCalendarAlt />

              <span>
                {createdDate
                  ? new Date(createdDate).toLocaleDateString(
                      undefined,
                      {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      }
                    )
                  : "Unknown"}
              </span>

            </div>

          </div>

        </div>


        {/* RIGHT SIDE BUTTONS */}

        <div className="flex sm:justify-end items-center gap-4">

          {/* COPY BUTTON */}

          <button
            type="button"
            onClick={copyLink}
            className="flex items-center justify-center gap-2 !bg-blue-600 !text-white font-semibold shadow-md px-6 py-2 rounded-md hover:!bg-blue-700 transition"
          >
            {isCopied ? "Copied" : "Copy"}

            {isCopied ? (
              <LiaCheckSolid className="text-lg !text-white" />
            ) : (
              <IoCopy className="text-lg !text-white" />
            )}
          </button>


          {/* ANALYTICS BUTTON */}

          <button
            type="button"
            onClick={loadAnalytics}
            disabled={loadingAnalytics}
            className="flex items-center justify-center gap-2 !bg-rose-700 !text-white font-semibold shadow-md px-6 py-2 rounded-md hover:!bg-rose-800 disabled:opacity-60"
          >
            {loadingAnalytics ? "Loading..." : "Analytics"}

            <MdAnalytics className="text-lg !text-white" />
          </button>

        </div>

      </div>


      {/* ==========================================
          ANALYTICS
      =========================================== */}

      {showAnalytics && (
        <div className="max-h-96 min-h-96 mt-5 relative border-t-2 w-full overflow-hidden">

          {analyticsData.length > 0 ? (
            <Graph graphData={analyticsData} />
          ) : (
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center">

              <h1 className="text-slate-800 font-serif text-xl font-bold">
                No Data For This Time Period
              </h1>

              <p className="max-w-md text-sm text-slate-600 mt-2">
                Share your short link to view where your engagements are coming from
              </p>

            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default ShortenItem;