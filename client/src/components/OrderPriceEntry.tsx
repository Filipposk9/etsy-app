import { HTMLAttributes } from "react";

import { formatPrice } from "../utils/formatPrice";

type OrderPriceEntryType = {
  text: string;
  value: number;
};

type Props = HTMLAttributes<HTMLDivElement> & OrderPriceEntryType;
const OrderPriceEntry = ({ text, value }: Props): JSX.Element => {
  return (
    <div>
      <span className="text-sm">{text}:</span>
      <span className="text-md pl-1">{formatPrice(value)}</span>
    </div>
  );
};

export default OrderPriceEntry;
