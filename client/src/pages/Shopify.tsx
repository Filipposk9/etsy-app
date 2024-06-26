import { useCallback, useEffect, useState } from "react";

import OrdersCollection from "../components/OrdersCollection";

import Spinner from "../components/Spinner";

import * as ShopifyApi from "../network/shopify_api";
import { OrderType } from "../components/Order";

import * as ReceiptsApi from "../network/receipts_api";
import { normalizeCountry } from "../utils/normalizeCountry";
import { createVoucher } from "../utils/createVoucher";
import { normalizeOrders } from "../utils/normalizeOrders";

const Shopify = (): JSX.Element | null => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [checkedOrders, setCheckedOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const orders = await ShopifyApi.getData();

        const normalizedOrders = normalizeOrders(orders);

        setOrders(normalizedOrders);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
    getData();
  }, []);

  const handleGetDataClick = useCallback(() => {
    async function getData() {
      try {
        setOrders([]);
        const orders = await ShopifyApi.getData();
        setOrders(orders);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
    getData();
  }, []);

  const handleExportLogClick = useCallback(() => {
    const ordersString = checkedOrders
      .map((order) => {
        const formattedOrder = Object.entries(order)
          .map(([key, value]) => {
            if (typeof value === "object" && value !== null) {
              return `${key}: ${JSON.stringify(value)}`;
            } else {
              return `${key}: ${value}`;
            }
          })
          .join("\n");
        return formattedOrder;
      })
      .join("\n---------------------------------------------------------\n");

    const blob = new Blob([ordersString], { type: "text/plain" });

    const a = document.createElement("a");
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = "orders.txt";

    a.click();
  }, [checkedOrders]);

  const handleCreateVoucherClick = useCallback(async () => {
    async function createVouchers() {
      if (checkedOrders.length > 0) {
        const csvHeader = [
          "Country",
          "Service",
          "ID",
          "Given Name",
          "Surname",
          "Organisation Name",
          "Registration Number",
          "Pick Up Point",
          "Parcel Locker",
          "Street Name",
          "Street Number",
          "Extension",
          "Street Specification",
          "Postal Code",
          "District Number",
          "Town",
          "Region / State",
          "District",
          "County",
          "Telephone Number",
          "Email",
          "Reference No",
          "Weight (in Kg)",
          "Length (in cm)",
          "Width (in cm)",
          "Height (in cm)",
          "Quantity",
          "COD (In €)",
          "Insured Value (In €)",
          "Gift",
          "Documents",
          "Commercial sample",
          "Returned goods",
          "Sale Of Goods",
          "Other",
          "Explanation",
          "Detailed description of contents",
          "Quantity",
          "Net weight (in Kg)",
          "Value (in €)",
          "HS tariff number",
          "Country of origin of goods",
          "Detailed description of contents",
          "Quantity",
          "Net weight (in Kg)",
          "Value (in €)",
          "HS tariff number",
          "Country of origin of goods",
          "Detailed description of contents",
          "Quantity",
          "Net weight (in Kg)",
          "Value (in €)",
          "HS tariff number",
          "Country of origin of goods",
          "Detailed description of contents",
          "Quantity",
          "Net weight (in Kg)",
          "Value (in €)",
          "HS tariff number",
          "Country of origin of goods",
          "Comments",
          "Importer's reference",
          "Importer's telephone/fax/e-mail",
          "Licence No(s)",
          "Certificate No(s)",
          "Invoice No(s)",
        ].join(";");

        const csvLinesPromises = checkedOrders.map(async (order) => {
          const countryIsEu = normalizeCountry(order.country_iso)?.isEu;

          const voucher = createVoucher(order);

          const receipt = await ReceiptsApi.getReceipt(order.receipt_id);

          const tail = !countryIsEu
            ? ";".repeat(30) + receipt.legalDocNumber
            : ";".repeat(36);

          const csvLine = `${voucher}${tail}`;

          return csvLine;
        });

        const csvLines = await Promise.all(csvLinesPromises);

        const blobBody = `${csvHeader}\n${csvLines.join("\n")}`;
        const blob = new Blob([blobBody], { type: "text/plain" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);

        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}-${
          currentDate.getMonth() + 1
        }-${currentDate.getFullYear()}`;

        link.download = `${formattedDate} Arrikos_voucher.csv`;
        link.click();
      } else {
        alert("No valid orders");
      }
    }
    createVouchers();
  }, [checkedOrders]);

  const handleCheckedOrdersChange = useCallback(
    async (order: OrderType) => {
      const orderExists = checkedOrders.some(
        (o) => o.receipt_id === order.receipt_id
      );

      if (orderExists) {
        if (order.isChecked) {
          setCheckedOrders(
            checkedOrders.map((o) =>
              o.receipt_id === order.receipt_id ? order : o
            )
          );
        } else {
          setCheckedOrders(
            checkedOrders.filter((o) => o.receipt_id !== order.receipt_id)
          );
        }
      } else {
        if (order.isChecked) {
          setCheckedOrders([...checkedOrders, order]);
        }
      }
    },
    [checkedOrders]
  );

  if (!orders.length) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)] mt-16">
        <Spinner />
      </div>
    );
  }

  if (orders && orders.length > 0) {
    return (
      <div className="mt-16">
        <OrdersCollection
          orders={orders}
          onHandleRefreshButtonClick={handleGetDataClick}
          onHandleExportLogClick={handleExportLogClick}
          onHandleCreateVoucherClick={handleCreateVoucherClick}
          onHandleOrderChange={handleCheckedOrdersChange}
        />
      </div>
    );
  }

  return null;
};

export default Shopify;
