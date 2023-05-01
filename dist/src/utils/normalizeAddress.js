"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeAddress = void 0;
function normalizeAddress(formattedAddress, name) {
    const normalizedAddress = formattedAddress.replace(`${name}\n`, "");
    return normalizedAddress.replace(/\n/g, " ");
}
exports.normalizeAddress = normalizeAddress;
