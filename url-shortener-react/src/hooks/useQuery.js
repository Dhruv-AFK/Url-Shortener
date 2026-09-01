import {
  useQuery,
  useMutation,
} from "@tanstack/react-query";

import api from "../api/api";


// ================================
// GET MY SHORT URLS
// ================================

export const useFetchMyShortUrls = (token) => {
  return useQuery({
    queryKey: ["my-shortenurls", token],

    queryFn: async () => {
      const response = await api.get(
        "/api/urls/myurls",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response;
    },

    select: (response) => {
      const data = response.data || [];

      return [...data].sort(
        (a, b) =>
          new Date(b.createdDate) -
          new Date(a.createdDate)
      );
    },

    enabled: !!token,

    retry: false,

    staleTime: 5000,
  });
};


// ================================
// GET TOTAL CLICKS
// ================================

export const useFetchTotalClicks = (token) => {
  return useQuery({
    queryKey: ["url-totalclick", token],

    queryFn: async () => {
      const response = await api.get(
        "/api/urls/totalClicks?startDate=2026-01-01&endDate=2027-01-07",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response;
    },

    select: (response) => {
      const data = response.data || {};

      return Object.keys(data).map((key) => ({
        clickDate: key,
        count: data[key],
      }));
    },

    enabled: !!token,

    retry: false,

    staleTime: 5000,
  });
};


// ================================
// CREATE SHORT URL
// ================================

export const useCreateShortUrl = (token) => {
  return useMutation({

    mutationFn: async (originalUrl) => {

      const response = await api.post(
        "/api/urls/shorten",

        {
          originalUrl: originalUrl,
        },

        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },

  });
};