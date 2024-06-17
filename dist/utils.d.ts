import { Obj, UserModel } from "./types/types.js";
export declare const validateInput: (input: object) => {
    name?: string | undefined;
    email?: string | undefined;
    passwd?: string | undefined;
};
export declare const findUserByField: (field: Obj, restrict?: boolean) => Promise<import("sequelize").Model<any, any> | null>;
export declare const sanitizeInput: (input: Obj) => Obj;
export declare const updateUserField: (user: UserModel, field: Obj) => Promise<UserModel>;
export declare const jwtVerify: (token: string) => any;
