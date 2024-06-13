import { HTMLAttributes } from "react";
import { MdRefresh } from "react-icons/md";

import Order, { OrderType } from "./Order";

type Props = HTMLAttributes<HTMLDivElement> & {
  orders: Array<OrderType>;
  onHandleRefreshButtonClick: () => void;
  onHandleExportLogClick: () => void;
  onHandleCreateVoucherClick: () => void;
  onHandleOrderChange: (order: OrderType) => void;
};
const OrdersCollection = ({
  orders,
  onHandleRefreshButtonClick,
  onHandleExportLogClick,
  onHandleCreateVoucherClick,
  onHandleOrderChange,
}: Props): JSX.Element | null => {
  if (!orders.length) {
    return null;
  }

  return (
    <div className="w-3/4 my-4 mx-auto">
      <div className="flex flex-col bg-gray-600 p-2 rounded-2xl">
        <div
          className="my-2"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <button
            className="w-36 bg-gray-800 text-white rounded-md px-3 py-2 ml-2 text-sm font-medium hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-800"
            onClick={onHandleExportLogClick}
          >
            Export Log
          </button>

          <button
            className="w-36 bg-gray-800 text-white rounded-md px-3 py-2 ml-2 text-sm font-medium hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-800"
            onClick={onHandleCreateVoucherClick}
          >
            Create Vouchers
          </button>
          <MdRefresh
            size={24}
            color="white"
            className="cursor-pointer ml-2"
            onClick={onHandleRefreshButtonClick}
          />
        </div>

        {orders
          .sort(
            (a, b) =>
              a.transactions[0].expected_ship_date -
              b.transactions[0].expected_ship_date
          )
          .map((order) => (
            <Order
              key={`${order.name} - ${order.receipt_id}`}
              order={order}
              onOrderChange={onHandleOrderChange}
            />
          ))}
        <ol className="space-y-4 w-full"></ol>
      </div>
    </div>
  );
};

export default OrdersCollection;
