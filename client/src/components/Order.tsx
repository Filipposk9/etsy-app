import { HTMLAttributes } from "react";

import OrderPriceEntry from "./OrderPriceEntry";
import OrderInfoEntry from "./OrderInfoEntry";

import { calculateTotalOrderPrice } from "../utils/calculateTotalOrderPrice";

export type OrderType = {
  name: string;
  formatted_address: string;
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
};

type Props = HTMLAttributes<HTMLLIElement> & { order: OrderType };

const Order = ({
  order: { name, formatted_address, subtotal, gift_wrap_price, postage_price },
}: Props): JSX.Element => {
  return (
    <li>
      <div className="min-h-36 bg-gray-900 text-white rounded-2xl p-2">
        <OrderInfoEntry text="Order by" value={name} />
        <OrderInfoEntry text="Address" value={formatted_address} />
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
        <div className="flex justify-center">
          <button
            className="bg-gray-800 text-white rounded-md px-3 py-2 ml-2 text-sm font-medium hover:bg-gray-600"
            onClick={() => {}}
          >
            Generate Invoice
          </button>
        </div>
      </div>
    </li>
  );
};

export default Order;
