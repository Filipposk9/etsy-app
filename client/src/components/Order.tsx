import { HTMLAttributes, useCallback, useState } from "react";

import OrderPriceEntry from "./OrderPriceEntry";
import OrderInfoEntry from "./OrderInfoEntry";
import OrderDetails, { Transaction } from "./OrderDetails";

import * as GoProsvasisApi from "../network/goProsvasis_api";

import { calculateTotalOrderPrice } from "../utils/calculateTotalOrderPrice";
import {
  EXCHANGE_RATE,
  normalizeTransactions,
} from "../utils/normalizeTransactions";

import * as ReceiptsApi from "../network/receipts_api";
import { normalizeCountry } from "../utils/normalizeCountry";

export type OrderType = {
  name: string;
  buyer_email: string;
  address1: string;
  address2: string;
  formatted_address: string;
  phone: string;
  city: string;
  zip: string;
  province_code: string;
  country_iso: string;
  subtotal: {
    amount: number;
    currency_code: string;
  };
  gift_wrap_price: {
    amount: number;
    divisor: number;
  };
  total_shipping_cost: {
    amount: number;
    divisor: number;
  };
  receipt_id: number;
  transactions: Transaction[];
  weight: string;
  itemDescription: string;
  tariffNumber: string;
  isChecked: boolean;
};

type Props = HTMLAttributes<HTMLLIElement> & {
  order: OrderType;
  onOrderChange: (order: OrderType) => void;
};

const Order = ({
  order: {
    name,
    buyer_email,
    address1,
    address2,
    formatted_address,
    phone,
    city,
    zip,
    province_code,
    country_iso,
    subtotal,
    gift_wrap_price,
    total_shipping_cost,
    receipt_id,
    transactions,
  },
  onOrderChange,
}: Props): JSX.Element => {
  const itemDescriptionOptions: {
    [key: string]: string;
  } = {
    "WOODEN HOME DECOR ITEM": "4420909990",
    FRANKINCENSE: "33074100",
    "BRASS ARTWARE": "74082100",
    "BEESWAX WICK": "3406000000",
    "CHARCOAL TABLET": "44029000",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [weight, setWeight] = useState("");
  const [itemDescription, setItemDescription] = useState(
    Object.keys(itemDescriptionOptions)[0]
  );
  const [tariffNumber, setTariffNumber] = useState(
    itemDescriptionOptions[itemDescription]
  );

  const [isChecked, setIsChecked] = useState(false);

  const [noInvoiceNrError, setNoInvoiceNrError] = useState(false);

  const handleGenerateInvoiceClick = useCallback(async () => {
    setIsLoading(true);
    try {
      const invoice = await GoProsvasisApi.generateInvoice({
        name,
        buyer_email,
        formatted_address,
        city,
        zip,
        country_iso,
        subtotal,
        transactions: normalizeTransactions(
          transactions,
          subtotal.currency_code
        ),
        gift_wrap_price: gift_wrap_price.amount / gift_wrap_price.divisor,
        total_shipping_cost:
          subtotal.currency_code === "USD"
            ? total_shipping_cost.amount /
              total_shipping_cost.divisor /
              EXCHANGE_RATE
            : total_shipping_cost.amount / total_shipping_cost.divisor,
      });
      if (invoice.data.success) {
        localStorage.setItem(
          JSON.stringify(receipt_id),
          `${invoice.data.data.number}`
        );

        if (noInvoiceNrError) {
          setNoInvoiceNrError(false);

          const order = {
            name: name,
            buyer_email: buyer_email,
            address1: address1,
            address2: address2,
            formatted_address: formatted_address,
            phone: phone,
            city: city,
            zip: zip,
            province_code: province_code,
            country_iso: country_iso,
            subtotal: subtotal,
            gift_wrap_price: gift_wrap_price,
            total_shipping_cost: total_shipping_cost,
            receipt_id: receipt_id,
            transactions: transactions,
            weight: weight,
            itemDescription: itemDescription,
            tariffNumber: tariffNumber,
            isChecked: isChecked,
          };

          if (isChecked) {
            onOrderChange(order);
          }
        }

        try {
          const receipt = await ReceiptsApi.createReceipt({
            receiptId: receipt_id,
            legalDocSeries: invoice.data.data.series,
            legalDocNumber: invoice.data.data.number,
          });

          console.log(receipt);
        } catch (error) {
          console.log(error);
        }
      }
      console.log(invoice);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  }, [
    buyer_email,
    city,
    country_iso,
    formatted_address,
    gift_wrap_price,
    name,
    total_shipping_cost,
    receipt_id,
    subtotal,
    transactions,
    zip,
    itemDescription,
    onOrderChange,
    tariffNumber,
    weight,
    noInvoiceNrError,
    isChecked,
  ]);

  return (
    <li className="my-2">
      <div className="min-h-36 bg-gray-900 text-white rounded-2xl p-2">
        <OrderInfoEntry text="Order by" value={name} />
        <OrderInfoEntry
          text="Expected Shipping Date"
          value={
            Object.prototype.toString.call(
              transactions[0].expected_ship_date
            ) === "[object Date]"
              ? new Date(transactions[0].expected_ship_date).toLocaleDateString(
                  "en-GB"
                )
              : new Date(
                  transactions[0].expected_ship_date * 1000
                ).toLocaleDateString("en-GB")
          }
        />
        <OrderInfoEntry
          text="Address"
          value={formatted_address.replace(name, "")}
        />
        <hr className="py-1" />
        <div>
          <OrderPriceEntry
            text="Subtotal"
            value={subtotal.amount}
            currency={subtotal.currency_code}
          />
          <OrderPriceEntry
            text="Gift Wrap Price"
            value={gift_wrap_price.amount}
            currency={subtotal.currency_code}
          />
          {transactions[0].shipping_upgrade ? (
            <OrderInfoEntry text="Express Delivery" value={"Yes"} />
          ) : null}
          {total_shipping_cost ? (
            <OrderPriceEntry
              text="Total Shipping Cost"
              value={total_shipping_cost.amount}
              currency={subtotal.currency_code}
            />
          ) : null}
          <OrderPriceEntry
            text="Total"
            value={calculateTotalOrderPrice(
              subtotal.amount,
              gift_wrap_price.amount,
              total_shipping_cost?.amount
            )}
            currency={subtotal.currency_code}
          />
        </div>
        <hr className="py-1" />

        <OrderDetails transactions={transactions} />

        <div className="flex justify-center">
          <button
            className={`w-36 bg-gray-800 text-white rounded-md px-3 py-2 ml-2 text-sm font-medium hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-800 ${
              isChecked && noInvoiceNrError ? "border border-red-500" : ""
            }`}
            disabled={
              isLoading || !!localStorage.getItem(JSON.stringify(receipt_id))
            }
            onClick={handleGenerateInvoiceClick}
          >
            {isLoading ? "Generating" : "Generate Invoice"}
          </button>

          <div>
            <label className="ml-4">Βάρος: </label>
            <input
              type="text"
              className="text-black my-1 w-16 ml-4"
              value={weight}
              pattern="[0-9]+([,][0-9]{0,2})?"
              onChange={async (e) => {
                if (/^[0-9]*\,?[0-9]{0,2}$/.test(e.target.value)) {
                  setWeight(e.target.value);

                  const order = {
                    name: name,
                    buyer_email: buyer_email,
                    address1: address1,
                    address2: address2,
                    formatted_address: formatted_address,
                    phone: phone,
                    city: city,
                    zip: zip,
                    province_code: province_code,
                    country_iso: country_iso,
                    subtotal: subtotal,
                    gift_wrap_price: gift_wrap_price,
                    total_shipping_cost: total_shipping_cost,
                    receipt_id: receipt_id,
                    transactions: transactions,
                    weight: e.target.value,
                    itemDescription: itemDescription,
                    tariffNumber: tariffNumber,
                    isChecked: isChecked,
                  };

                  const receipt = await ReceiptsApi.getReceipt(
                    order.receipt_id
                  );

                  if (Object.keys(receipt).length > 0) {
                    onOrderChange(order);
                  }
                }
              }}
            ></input>
          </div>

          <div>
            <label className="ml-4">Item Description: </label>
            <select
              className="w-46 bg-gray-800 rounded-md px-3 py-2 ml-2 font-medium hover:bg-gray-600"
              onChange={async (e) => {
                setItemDescription(e.target.value);
                setTariffNumber(itemDescriptionOptions[e.target.value]);

                const order = {
                  name: name,
                  buyer_email: buyer_email,
                  address1: address1,
                  address2: address2,
                  formatted_address: formatted_address,
                  phone: phone,
                  city: city,
                  zip: zip,
                  province_code: province_code,
                  country_iso: country_iso,
                  subtotal: subtotal,
                  gift_wrap_price: gift_wrap_price,
                  total_shipping_cost: total_shipping_cost,
                  receipt_id: receipt_id,
                  transactions: transactions,
                  weight: weight,
                  itemDescription: e.target.value,
                  tariffNumber: itemDescriptionOptions[e.target.value],
                  isChecked: isChecked,
                };

                const receipt = await ReceiptsApi.getReceipt(order.receipt_id);

                if (Object.keys(receipt).length > 0) {
                  onOrderChange(order);
                }
              }}
            >
              {Object.keys(itemDescriptionOptions).map((item) => {
                return (
                  <option
                    key={item}
                    disabled={normalizeCountry(country_iso)?.isEu}
                    value={item}
                  >
                    {item}
                  </option>
                );
              })}
            </select>
          </div>

          <label className="ml-4">Έκδοση Voucher: </label>
          <input
            className="my-1 w-12"
            type="checkbox"
            onChange={async (e) => {
              setIsChecked(e.target.checked);

              const order = {
                name: name,
                buyer_email: buyer_email,
                address1: address1,
                address2: address2,
                formatted_address: formatted_address,
                phone: phone,
                city: city,
                zip: zip,
                province_code: province_code,
                country_iso: country_iso,
                subtotal: subtotal,
                gift_wrap_price: gift_wrap_price,
                total_shipping_cost: total_shipping_cost,
                receipt_id: receipt_id,
                transactions: transactions,
                weight: weight,
                itemDescription: itemDescription,
                tariffNumber: tariffNumber,
                isChecked: e.target.checked,
              };

              const receipt = await ReceiptsApi.getReceipt(order.receipt_id);

              if (!noInvoiceNrError && Object.keys(receipt).length > 0) {
                onOrderChange(order);
              } else {
                setNoInvoiceNrError(true);
              }
            }}
          ></input>
        </div>
      </div>
    </li>
  );
};

export default Order;
