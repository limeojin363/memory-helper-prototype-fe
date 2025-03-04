import KyInstance from "../../core/ky";

type LoginBody = {
    username: string;
    password: string;
};

const LoginRequest = (body: LoginBody) =>
    KyInstance.post("auth/login", { json: body });

export default LoginRequest;