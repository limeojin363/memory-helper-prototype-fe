import { ApiFunc } from "../../index.types";

export type TokenRefreshFunc = ApiFunc<
    TokenRefreshReqBody,
    TokenRefreshResData
>;

export type TokenRefreshReqBody = {
    refreshToken: string;
};

export type TokenRefreshResData = {
    accessToken: string;
    refreshToken: string;
};
