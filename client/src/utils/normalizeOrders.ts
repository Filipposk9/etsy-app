import { OrderType } from "../components/Order";
import { formatAddress } from "./formatAddress";
import { normalizeShopifyTransactions } from "./normalizeTransactions";

export const normalizeOrders = (orders: any[]): OrderType[] => {
  return orders.map((order: any) => {
    return {
      name: `${order.customer.first_name} ${order.customer.last_name}`,
      buyer_email: order.contact_email,
      address1: order.shipping_address.address1,
      address2: order.shipping_address.address2,
      formatted_address: formatAddress(order.shipping_address),
      phone: order.shipping_address.phone.replace(/\D/g, ""),
      city: order.shipping_address.city,
      zip: order.shipping_address.zip,
      province_code: order.shipping_address.province_code,
      country_iso: order.shipping_address.country_code,
      subtotal: {
        amount: Math.round(
          (Number(order.subtotal_price) + Number(order.total_tax)) * 100
        ),
        divisor: 100,
        currency_code: order.currency,
      },
      gift_wrap_price: {
        amount: 0,
        divisor: 1,
      },
      total_shipping_cost: {
        amount:
          order.shipping_lines.reduce((total: number, shipping_line: any) => {
            const price = Number(shipping_line.price);
            return shipping_line.price !== null && !isNaN(price)
              ? total + price
              : total;
          }, 0) * 100,
        divisor: 100,
      },
      receipt_id: order.id,
      transactions: normalizeShopifyTransactions(
        order.line_items,
        order.created_at
      ),
      weight: "",
      itemDescription: "",
      tariffNumber: "",
      isChecked: false,
    };
  });
};
