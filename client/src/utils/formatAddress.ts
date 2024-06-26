export function formatAddress(shipping_address: any): string {
  return `${shipping_address.address1 ?? ""} ${
    shipping_address.address2 ? shipping_address.address2 + " " : ""
  }${shipping_address.city ?? ""}, ${shipping_address.zip ?? ""} ${
    shipping_address.province_code ? shipping_address.province_code + " " : ""
  }${shipping_address.country ?? ""}`
    .trim()
    .replace(/\s+/g, "\n");
}
