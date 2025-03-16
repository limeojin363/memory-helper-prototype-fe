import { ResponsePromise } from "ky";
import { WrappedObject } from "../../core/type";
import { baseApiClient } from "../../core/clients";

type LoginBody = {
    email: string;
    password: string;
};

type LoginResponse = {
    username: string;
    accessToken: string;
    refreshToken: string;
};

const LoginRequest = (
    body: LoginBody,
): ResponsePromise<WrappedObject<LoginResponse>> =>
    baseApiClient.post("auth/login", { json: body });

export default LoginRequest;
