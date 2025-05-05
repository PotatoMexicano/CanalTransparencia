import { fetchBaseQuery } from "@reduxjs/toolkit/query"

export const customBaseQuery = () => {
  return fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api`,
    credentials: 'include',
  });
}