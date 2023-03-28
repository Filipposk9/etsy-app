export const formatPrice = (price: number): string => {
  if (price === 0) {
    return `${price} €`;
  }

  return `${price / 100} €`;
};
