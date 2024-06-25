import { fetchData } from "../utils/fetchData";

export const getData = async (): Promise<any> => {
  const data = await fetchData("/api/shopify/data", {
    method: "GET",
  });

  return await data.json();
};
