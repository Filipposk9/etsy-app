export function normalizeAddress(
  formattedAddress: string,
  name: string
): string {
  const normalizedAddress = formattedAddress.replace(`${name}\n`, "");

  return normalizedAddress.replace("\n", " ");
}
