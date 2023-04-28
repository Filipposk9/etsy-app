import { HTMLAttributes } from "react";

export type Transaction = {
  title: string;
};

type Props = HTMLAttributes<HTMLDetailsElement> & {
  transactions: Transaction[];
};

const OrderDetails = ({ transactions }: Props) => {
  return (
    <>
      <details>
        <summary>Ordered Items: {transactions.length}</summary>
        <ol className="px-4 my-1 space-y-2">
          {transactions.map((t: any) => (
            <li className="list-disc text-sm">{t.title}</li>
          ))}
        </ol>
      </details>
      <hr className="py-1" />
    </>
  );
};

export default OrderDetails;
