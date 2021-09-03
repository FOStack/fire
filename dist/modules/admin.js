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
exports.timestamp = exports.notify = exports.docs = exports.col = exports.add = exports.del = exports.update = exports.set = exports.get = exports.id = exports.user = exports.message = exports.storage = exports.db = exports.auth = void 0;
const admin = require("firebase-admin");
admin.initializeApp();
exports.auth = admin.auth();
exports.db = admin.firestore();
exports.storage = admin.storage();
exports.message = admin.messaging();
const user = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield exports.db.collection('users').doc(uid).get();
    return user.data();
});
exports.user = user;
///// HELPER FUNCTIONS: FIREBASE /////
const id = () => {
    return exports.db.collection(``).doc().id;
};
exports.id = id;
const get = (c, d) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield exports.db.collection(c).doc(d).get();
    return (doc.exists) ? doc.data() : undefined;
});
exports.get = get;
const set = (c, d, data) => {
    return exports.db.collection(c).doc(d).set(data);
};
exports.set = set;
const update = (c, d, data) => {
    return exports.db.collection(c).doc(d).update(data);
};
exports.update = update;
const del = (r, id) => {
    return exports.db.collection(r).doc(id).delete();
};
exports.del = del;
const add = (r, data) => {
    return exports.db.collection(r).add(data);
};
exports.add = add;
const col = (p, l) => {
    const ref = exports.db.collection(p.ref);
    if (Array.isArray(p)) {
        p.forEach((v) => {
            ref.where(v.field, v.operator || v.op || '==', v.query);
        });
    }
    else {
        ref.where(p.field, p.operator || p.op || '==', p.query);
    }
    if (l) {
        ref.limit(l);
    }
    return ref;
};
exports.col = col;
const docs = (p, i) => __awaiter(void 0, void 0, void 0, function* () {
    let data;
    const query = yield exports.col(p).get();
    if (!query.empty) {
        const snapshot = query.docs[i || 0];
        data = snapshot.data();
    }
    return (data) ? data : undefined;
});
exports.docs = docs;
const notify = (p, user) => __awaiter(void 0, void 0, void 0, function* () {
    let r = {};
    if (user.token && user.token !== "") {
        // Notification content
        const payload = {
            notification: {
                title: 'Preparing Order',
                body: `${p.seller.name} has recieved your order.`,
                sound: 'default'
            }
        };
        r = yield exports.message.sendToDevice(user.token, payload);
    }
    return r;
});
exports.notify = notify;
const timestamp = (d) => {
    const stamp = admin.firestore.Timestamp; //[(d)?'fromDate':'now'];
    return (d) ? stamp.fromDate(d) : stamp.now();
};
exports.timestamp = timestamp;
