import { ResponsePromise } from "ky";
import { WrappedObject } from "../../core/type";
import { baseApiClient } from "../../core/clients";

type TokenRefreshResponse = {
    accessToken: string;
    refreshToken: string;
};

const TokenRefreshRequest = (
    refreshToken: string,
): ResponsePromise<WrappedObject<TokenRefreshResponse>> =>
    baseApiClient.post("auth/token-refresh", { json: { refreshToken } });

export default TokenRefreshRequest;
