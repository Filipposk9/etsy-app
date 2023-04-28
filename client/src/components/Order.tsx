import { HTMLAttributes, useCallback } from "react";

import OrderPriceEntry from "./OrderPriceEntry";
import OrderInfoEntry from "./OrderInfoEntry";
import OrderDetails from "./OrderDetails";

import { calculateTotalOrderPrice } from "../utils/calculateTotalOrderPrice";
import * as GoProsvasisApi from "../network/goProsvasis_api";

import { normalizeTransactions } from "../utils/normalizeTransactions";

export type OrderType = {
  name: string;
  buyer_email: string;
  formatted_address: string;
  city: string;
  zip: string;
  country_iso: string;
  subtotal: {
    amount: number;
  };
  gift_wrap_price: {
    amount: number;
  };
  postage_price?: {
    amount: number;
  };
  receipt_id: number;
  transactions: [];
};

type Props = HTMLAttributes<HTMLLIElement> & { order: OrderType };

const Order = ({
  order: {
    name,
    buyer_email,
    formatted_address,
    city,
    zip,
    country_iso,
    subtotal,
    gift_wrap_price,
    postage_price,
    transactions,
  },
}: Props): JSX.Element => {
  const handleGenerateInvoiceClick = useCallback(async () => {
    try {
      const invoice = await GoProsvasisApi.generateInvoice({
        name,
        buyer_email,
        formatted_address,
        city,
        zip,
        country_iso,
        subtotal,
        transactions: normalizeTransactions(transactions),
      });
      console.log(invoice);
    } catch (error) {
      console.log(error);
    }
  }, [
    buyer_email,
    city,
    country_iso,
    formatted_address,
    name,
    subtotal,
    transactions,
    zip,
  ]);

  return (
    <li>
      <div className="min-h-36 bg-gray-900 text-white rounded-2xl p-2">
        <OrderInfoEntry text="Order by" value={name} />
        <OrderInfoEntry
          text="Address"
          value={formatted_address.replace(name, "")}
        />
        <hr className="py-1" />
        <div>
          <OrderPriceEntry text="Subtotal" value={subtotal.amount} />
          <OrderPriceEntry
            text="Gift Wrap Price"
            value={gift_wrap_price.amount}
          />
          {postage_price ? (
            <OrderPriceEntry
              text="Postage Price"
              value={postage_price.amount}
            />
          ) : null}
          <OrderPriceEntry
            text="Total"
            value={calculateTotalOrderPrice(
              subtotal.amount,
              gift_wrap_price.amount,
              postage_price?.amount
            )}
          />
        </div>
        <hr className="py-1" />

        <OrderDetails transactions={transactions} />

        <div className="flex justify-center">
          <button
            className="bg-gray-800 text-white rounded-md px-3 py-2 ml-2 text-sm font-medium hover:bg-gray-600"
            onClick={handleGenerateInvoiceClick}
          >
            Generate Invoice
          </button>
        </div>
      </div>
    </li>
  );
};

export default Order;
