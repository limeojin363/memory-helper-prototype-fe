import ky, { BeforeRequestHook, BeforeRetryHook, HTTPError } from "ky";
import AuthApi from "../services/auth";

const HOST =
    "https://port-0-memory-helper-prototype-be-m6ekc447ebe44eb6.sel4.cloudtype.app";

const PATHNAME_POSTFIX = "/api";

const setAuthorizationHeader: BeforeRequestHook = (request) => {
    console.log("setAuthorizationHeader");
    const rawAccessToken = localStorage.getItem("accessToken");
    if (!rawAccessToken) return;

    const parsedAccessToken = JSON.parse(rawAccessToken);
    request.headers.set("Authorization", `Bearer ${parsedAccessToken}`);
};

const DEFAULT_RETRY_LIMIT = 3;

const handleTokenRefresh: BeforeRetryHook = async ({ error, retryCount }) => {
    console.log("refresh");

    const httpError = error as HTTPError;
    if (httpError.response.status !== 401) {
        console.log("401이 아닌 에러 발생, 중단", httpError);
        return ky.stop;
    }

    if (retryCount === DEFAULT_RETRY_LIMIT - 1) {
        window.location.href = "/login";
        await AuthApi.Logout();
        return ky.stop;
    }

    try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            throw new Error("refreshToken이 없음");
        }
        const { data } = await (
            await AuthApi.TokenRefresh(refreshToken)
        ).json();

        localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
        localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
    } catch (error) {
        window.location.href = "/login";
        console.error("Token refresh 실패, 로그아웃", error);
        await AuthApi.Logout();
        return ky.stop;
    }
};

export const baseApiClient = ky.create({
    prefixUrl: HOST + PATHNAME_POSTFIX,
    headers: {
        accept: "application/json",
    },
});

const apiClient = ky.extend({
    prefixUrl: HOST + PATHNAME_POSTFIX,
    timeout: 10000,
    retry: {
        limit: DEFAULT_RETRY_LIMIT,
        backoffLimit: 1000,
        methods: ["get", "post", "put", "delete"],
        statusCodes: [401, 408, 413, 429, 500, 502, 503, 504],
    },
    hooks: {
        beforeRetry: [handleTokenRefresh],
        beforeRequest: [setAuthorizationHeader],
    },
});

export default apiClient;
