import { ApiFunc } from "../../index.types";

export type LoginFunc = ApiFunc<LoginReqBody, LoginResData>;

export type LoginReqBody = {
    email: string;
    password: string;
};

export type LoginResData = {
    username: string;
    accessToken: string;
    refreshToken: string;
};
