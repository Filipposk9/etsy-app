export const calculateTotalOrderPrice = (
  subtotal: number,
  postage: number,
  giftWrap?: number
): number => {
  if (giftWrap) {
    return subtotal + postage + giftWrap;
  }

  return subtotal + postage;
};
