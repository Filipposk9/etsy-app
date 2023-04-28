import { fetchData } from "../utils/fetchData";

export const generateInvoice = async (order: any) => {
  const response = await fetchData("/api/goProsvasis/invoice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  return response.json();
};
