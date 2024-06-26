import { Transaction } from "../components/OrderDetails";

export const normalizeTransactions = (transactions: Transaction[]) => {
  return transactions.map((t) => {
    return {
      quantity: t.quantity,
      price: (t.quantity * t.price.amount) / t.price.divisor - t.shop_coupon,
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
        amount: (item.tax_lines && item.tax_lines.length > 0
          ? Number(item.price) +
            Number(
              item.tax_lines.reduce((total: number, tax_line: any) => {
                return total + Number(tax_line.price);
              }, 0) -
                item.discount_allocations.reduce(
                  (total: number, discount: any) => {
                    return total + Number(discount.amount);
                  },
                  0
                )
            )
          : Number(item.price) -
            item.discount_allocations.reduce((total: number, discount: any) => {
              return total + Number(discount.amount);
            }, 0)
        ).toFixed(2),
        divisor: 1,
      },
      shop_coupon: 0,
      shipping_upgrade: null,
      expected_ship_date: new Date(order_date),
    };
  });
};
