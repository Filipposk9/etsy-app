export function createVoucher(order: any, countryIsEu: boolean | undefined) {
  const service = determineService(
    order.country_iso,
    order.gift_wrap_price,
    order.subtotal
  );

  const phone = order.phone && order.phone !== null ? order.phone : "";

  let zip = order.zip;

  if (/\d/.test(order.zip)) {
  } else {
    let temp = order.formatted_address.split("\n")[4];

    zip = temp.split(/\s+/).filter((word: string) => /\d/.test(word));

    zip = zip.toString().replace(",", " ");
  }

  let organization = "";
  let streetName = "";
  let town = "";

  if (order.address1 && order.address1 !== "") {
    streetName = order.address1;

    if (order.address2 !== null && order.address2 !== "") {
      organization = order.address2;
    }

    town = `${order.city} ${order.province_code}`;
  } else {
    const address = order.formatted_address.split("\n")[1];

    if (address.length > 30) {
      const words: string[] = address.split(" ");
      const organizationArray: string[] = [];
      let totalLength: number = 0;

      for (const word of words) {
        if (totalLength + word.length <= 35) {
          organizationArray.push(word);
          totalLength += word.length + 1;
        }
      }

      organization = organizationArray.join(" ");

      streetName = words.slice(organizationArray.length - 1).join(" ");

      if (streetName.length > 30) {
        town =
          streetName.split(",")[1] +
          " " +
          order.formatted_address.split("\n")[2];
        streetName = streetName.split(",")[0];
      } else {
        town = order.formatted_address.split("\n")[2];
      }
    } else {
      streetName = address;

      if (order.formatted_address.split("\n").length >= 5) {
        let townWithPostalCode = order.formatted_address.replace(",\n", "");

        townWithPostalCode = townWithPostalCode.split("\n")[3].split(" ");

        let totalString = "";

        for (let i = 0; i < townWithPostalCode.length; i++) {
          let currentElement = townWithPostalCode[i];

          if (/\d/.test(currentElement)) {
          } else {
            totalString += currentElement + " ";
          }
        }

        town = totalString;

        let newStreetname =
          streetName + " " + order.formatted_address.split("\n")[2];

        if (newStreetname.length > 30 && organization === "") {
          organization = order.formatted_address.split("\n")[2];
        } else {
          streetName = newStreetname;
        }
      } else {
        let townWithPostalCode = order.formatted_address.replace(",\n", "");

        townWithPostalCode = townWithPostalCode.split("\n")[2].split(" ");

        let totalString = "";

        for (let i = 0; i < townWithPostalCode.length; i++) {
          let currentElement = townWithPostalCode[i];

          if (/\d/.test(currentElement)) {
          } else {
            totalString += currentElement + " ";
          }
        }

        town = totalString;
      }
    }
  }

  const name = latinizeWord(order.name.split(" ")[0]);

  let surname =
    order.name.split(" ").length > 2
      ? order.name.replace(order.name.split(" ")[0] + " ", "")
      : order.name.split(" ")[1];

  if (surname === undefined) {
    surname = "-";
  } else {
    surname = latinizeWord(surname);

    if (surname.length > 20) {
      const words = surname.split(" ");

      let totalLength = 0;
      let surnameArray = [];
      let organizationArray = [];

      for (const word of words) {
        if (totalLength + word.length <= 20) {
          surnameArray.push(word);
          totalLength += word.length + 1;
        }

        if (totalLength + word.length <= 55 && totalLength + word.length > 20) {
          organizationArray.push(word);
          totalLength += word.length + 1;
        }
      }

      surname = surnameArray.join(" ");
      organization = organizationArray.join(" ");
    }
  }

  streetName = latinizeWord(streetName);
  town = latinizeWord(town);

  const totalValue =
    order.subtotal.amount / order.subtotal.divisor +
    order.gift_wrap_price.amount / order.gift_wrap_price.divisor +
    order.total_shipping_cost.amount / order.total_shipping_cost.divisor;

  const baseVoucher = {
    Country: order.country_iso,
    Service: service,
    ID: "",
    "Given Name": name,
    Surname: surname,
    "Organisation Name": organization, //TODO: use only if name does not fit //length 35
    "Registration Number": "",
    "Pick Up Point": "",
    "Parcel Locker": "",
    "Street Name": streetName,
    "Street Number": "-",
    Extension: "",
    "Street Specification": "",
    "Postal Code": zip,
    "District Number": "",
    Town: town,
    "Region/State": "",
    District: "",
    County: "",
    Telephone: phone,
    Email: "byzholyart@gmail.com",
    "Reference No": "",
    "Weight (in Kg)": order.weight,
    "Length (in cm)": "",
    "Width (in cm)": "",
    "Height (in cm)": "",
    Quantity: 1,
    COD: "",
    "Insured Value": "",
    Gift: "",
    Documents: "",
    "Commercial Sample": "",
    "Returned Goods": "",
    "Sale Of Goods": 1,
    Other: "",
    Explanation: "",
  };

  const nonEuSpecificFields = {
    "Detailed description of contents": order.itemDescription,
    Quantity1: "1",
    "Net weight (in Kg)": order.weight,
    "Value (in €)": totalValue.toString().replace(".", ","),
    "HS tariff number": order.tariffNumber,
    "Country of origin of goods": "GR",
  };

  const voucher = countryIsEu
    ? { ...baseVoucher }
    : { ...baseVoucher, ...nonEuSpecificFields };

  return Object.values(voucher).join(";").replace(/"/g, "");
}

const service = new Map([
  ["AU", { giftWrap: 853, highSubtotal: 853, lowSubtotal: 851, threshold: 70 }],
  ["CA", { giftWrap: 854, highSubtotal: 854, lowSubtotal: 851, threshold: 30 }],
  ["US", { giftWrap: 853, highSubtotal: 853, lowSubtotal: 851, threshold: 30 }],
  [
    "default",
    { giftWrap: 854, highSubtotal: 854, lowSubtotal: 851, threshold: 30 },
  ],
]);

function determineService(
  countryIso: string,
  giftWrapPrice: any,
  subtotal: any
) {
  const serviceCode = service.get(countryIso) || service.get("default");

  if (serviceCode) {
    const subtotalAmount = subtotal.amount / subtotal.divisor;

    if (giftWrapPrice.amount > 0) {
      return serviceCode.giftWrap;
    } else if (subtotalAmount > serviceCode.threshold) {
      return serviceCode.highSubtotal;
    } else {
      return serviceCode.lowSubtotal;
    }
  }
}

function latinizeWord(word: string): string {
  const REPLACEMENTS = [
    { from: /[\u0300-\u036f]/g, to: "" },
    { from: /ß/g, to: "ss" },
    { from: /\u00BA/g, to: "" },
    { from: /ł/g, to: "l" },
    { from: /á/g, to: "a" },
    { from: /Ú/g, to: "U" },
    { from: /é/g, to: "e" },
    { from: /ó/g, to: "o" },
    { from: /ö/g, to: "o" },
  ];

  let normalizedWord = word.normalize("NFD");

  REPLACEMENTS.forEach((replacement) => {
    normalizedWord = normalizedWord.replace(replacement.from, replacement.to);
  });

  return normalizedWord;
}
