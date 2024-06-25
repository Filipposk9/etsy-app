export const normalizeOrders = (orders: any[]) => {
  return orders.map((order: any) => {
    return {
      name: `${order.customer.first_name} ${order.customer.last_name}`,
      buyer_email: order.contact_email,
      formatted_address: `${order.shipping_address.address1 ?? ""} ${
        order.shipping_address.address2
          ? order.shipping_address.address2 + " "
          : ""
      }${order.shipping_address.city ?? ""}, ${
        order.shipping_address.zip ?? ""
      } ${
        order.shipping_address.province_code
          ? order.shipping_address.province_code + " "
          : ""
      }${order.shipping_address.country ?? ""}`
        .trim()
        .replace(/\s+/g, " "),
      city: order.shipping_address.city,
      zip: order.shipping_address.zip,
      country_iso: order.shipping_address.country_code,
      subtotal: {
        amount: (Number(order.subtotal_price) + Number(order.total_tax)) * 100,
        divisor: 100,
        currency_code: order.currency,
      },
      gift_wrap_price: {
        amount: 0,
        divisor: 1,
      },
      total_shipping_cost: {
        amount:
          order.shipping_lines.reduce(
            (total: number, shipping_line: any) =>
              shipping_line.price && shipping_line.price !== null
                ? total + Number(shipping_line.price)
                : total,
            0
          ) * 100,
        divisor: 1,
      },
      receipt_id: order.id,
      transactions: order.line_items.map((item: any) => {
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
              : Number(item.price)
            ).toFixed(2),
            divisor: 1,
          },
          shop_coupon: 0,
          shipping_upgrade: null,
          expected_ship_date: new Date(order.created_at),
        };
      }),
      weight: "",
      itemDescription: "",
      tariffNumber: "",
      isChecked: false,
    };
  });
};
