import { EtsyCredentials } from "../models/etsyCredentials";
import { fetchData } from "../utils/fetchData";
import { EtsyToken } from "../models/etsyToken";

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

export const setAccessToken = async (
  code: string
): Promise<EtsyCredentials> => {
  const response = await fetchData("/api/etsy/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  return await response.json();
};

export const getAccessToken = async (): Promise<EtsyToken> => {
  const token = await fetchData("/api/etsy/token", {
    method: "GET",
  });

  return await token.json();
};

export const getData = async (): Promise<any> => {
  const data = await fetchData("/api/etsy/data", {
    method: "GET",
  });

  return await data.json();
};
