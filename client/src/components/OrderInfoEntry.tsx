import { HTMLAttributes } from "react";

type OrderInfoEntryType = {
  text: string;
  value: string;
};

type Props = HTMLAttributes<HTMLDivElement> & OrderInfoEntryType;
const OrderInfoEntry = ({ text, value }: Props): JSX.Element => {
  return (
    <div>
      <span className="text-sm">{text} :</span>
      <span className="text-md pl-1">{value}</span>
    </div>
  );
};

export default OrderInfoEntry;
