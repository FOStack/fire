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
exports.destroy = exports.remove = exports.modify = exports.create = void 0;
const functions = require("firebase-functions");
const admin_1 = require("../modules/admin");
const user_1 = require("../models/user");
exports.create = functions.auth.user().onCreate((event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = user_1.userObject(event);
        return admin_1.set('users', user.uid, user);
    }
    catch (e) {
        throw { msg: 'User creation unsuccessful.' };
    }
}));
exports.modify = functions.https.onCall((p, c) => __awaiter(void 0, void 0, void 0, function* () {
    if (!c.auth)
        throw { msg: 'Please re-authenticate.' };
    const user = c.auth;
    const data = (p) ? p : {};
    return admin_1.update('users', user.uid, data);
}));
exports.remove = functions.auth.user().onDelete((event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield admin_1.del('users', event.uid);
        return status;
    }
    catch (e) {
        throw { msg: 'User deletion unsuccessful.' };
    }
}));
exports.destroy = functions.https.onCall((data, context) => __awaiter(void 0, void 0, void 0, function* () {
    return yield admin_1.auth.deleteUser(data);
}));
