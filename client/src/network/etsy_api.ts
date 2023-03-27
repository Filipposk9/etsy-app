import { EtsyCredentials } from "../models/etsyCredentials";
import { fetchData } from "../utils/fetchData";

export const getEtsyCredentials = async (): Promise<EtsyCredentials> => {
  const response = await fetchData("/api/etsy", {
    method: "GET",
  });

  return await response.json();
};

export const setEtsyCredentials = async (): Promise<EtsyCredentials> => {
  const response = await fetchData("/api/etsy", {
    method: "POST",
  });

  return await response.json();
};

export const getAccessToken = async (
  code: string
): Promise<EtsyCredentials> => {
  console.log("CODE:", code);
  const response = await fetchData("/api/etsy/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  return await response.json();
};
