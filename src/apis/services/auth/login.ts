import { ResponsePromise } from "ky";
import KyInstance from "../../core/ky";
import { WrappedObject } from "../../core/type";

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
    KyInstance.post("auth/login", { json: body });

export default LoginRequest;
