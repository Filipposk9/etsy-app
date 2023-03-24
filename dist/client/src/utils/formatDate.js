"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
function formatDate(date) {
    return new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });
}
exports.formatDate = formatDate;
