export const formatPrice = (price: number, currency: string): string => {
  if (price === 0) {
    return `${price} ${currency === "EUR" ? "€" : "$"}`;
  }

  return `${price / 100} ${currency === "EUR" ? "€" : "$"}`;
};
