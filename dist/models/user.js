"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userObject = void 0;
const userObject = (event) => {
    return {
        createdAt: Date.now(),
        disabled: (event === null || event === void 0 ? void 0 : event.disabled) || false,
        uid: (event === null || event === void 0 ? void 0 : event.uid) || ''
    };
};
exports.userObject = userObject;
