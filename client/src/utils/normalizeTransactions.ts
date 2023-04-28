import { Transaction } from "../components/OrderDetails";

export const normalizeTransactions = (transactions: Transaction[]) => {
  return transactions.map((t) => {
    return {
      quantity: t.quantity,
      price: t.price.amount / t.price.divisor - t.shop_coupon,
    };
  });
};
