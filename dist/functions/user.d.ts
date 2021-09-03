import * as functions from "firebase-functions";
export declare const create: functions.CloudFunction<import("firebase-admin").auth.UserRecord>;
export declare const modify: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response<any>) => void | Promise<void>) & functions.Runnable<any>;
export declare const remove: functions.CloudFunction<import("firebase-admin").auth.UserRecord>;
export declare const destroy: functions.TriggerAnnotated & ((req: functions.Request<import("express-serve-static-core").ParamsDictionary>, resp: functions.Response<any>) => void | Promise<void>) & functions.Runnable<any>;
