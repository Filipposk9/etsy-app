export const calculateTotalOrderPrice = (
  subtotal: number,
  postage: number,
  giftWrap?: number,
  express?: boolean
): number => {
  if (giftWrap && express) {
    return subtotal + postage + giftWrap + 20;
  }

  if (giftWrap) {
    return subtotal + postage + giftWrap;
  }

  if (express) {
    return subtotal + postage + 2000;
  }

  return subtotal + postage;
};
