import { Transaction } from "../components/OrderDetails";

export const EXCHANGE_RATE = 1.0749;

export const normalizeTransactions = (
  transactions: Transaction[],
  currency: string
) => {
  return transactions.map((t) => {
    return {
      quantity: t.quantity,
      price:
        Math.round(
          (((t.quantity * t.price.amount) / t.price.divisor - t.shop_coupon) /
            (currency === "USD" ? EXCHANGE_RATE : 1)) *
            100
        ) / 100,
    };
  });
};

export const normalizeShopifyTransactions = (
  order_line_items: any,
  order_date: any
) => {
  return order_line_items.map((item: any) => {
    return {
      title: item.name,
      quantity: item.quantity,
      price: {
        amount:
          (item.tax_lines && item.tax_lines.length > 0
            ? Number(item.price) +
              Number(
                item.tax_lines.reduce((total: number, tax_line: any) => {
                  return total + Number(tax_line.price);
                }, 0)
              )
            : Number(item.price)) * 100,
        divisor: 100,
      },
      shop_coupon: item.discount_allocations.reduce(
        (total: number, discount: any) => {
          return total + Number(discount.amount);
        },
        0
      ),
      shipping_upgrade: null,
      expected_ship_date: new Date(order_date),
    };
  });
};
