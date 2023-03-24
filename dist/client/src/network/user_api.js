"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signUp = exports.getLoggedInUser = void 0;
const fetchData_1 = require("../utils/fetchData");
function getLoggedInUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, fetchData_1.fetchData)("/api/users", { method: "GET" });
        return response.json();
    });
}
exports.getLoggedInUser = getLoggedInUser;
function signUp(credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, fetchData_1.fetchData)("/api/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        return response.json();
    });
}
exports.signUp = signUp;
function login(login) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, fetchData_1.fetchData)("/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(login),
        });
        return response.json();
    });
}
exports.login = login;
function logout() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, fetchData_1.fetchData)("/api/users/logout", { method: "POST" });
    });
}
exports.logout = logout;
