import { HTMLAttributes } from "react";
import { MdRefresh } from "react-icons/md";

import Order, { OrderType } from "./Order";

type Props = HTMLAttributes<HTMLDivElement> & {
  orders: Array<OrderType>;
  onHandleRefreshButtonClick: () => void;
};
const Orders = ({
  orders,
  onHandleRefreshButtonClick,
}: Props): JSX.Element | null => {
  if (!orders.length) {
    return null;
  }

  return (
    <div className="w-3/4 mt-4 mx-auto">
      <div className="flex flex-col bg-gray-600 p-2 rounded-2xl">
        <MdRefresh
          size={24}
          color="white"
          className="self-end cursor-pointer"
          onClick={onHandleRefreshButtonClick}
        />
        <ol className="space-y-4 w-full">
          {orders.map((order) => (
            <Order key={order.name} order={order} />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Orders;
