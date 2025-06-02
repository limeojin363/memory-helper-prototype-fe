import { baseApiClient } from "../../../core/clients";
import { LoginFunc } from "./index.types";

const Login: LoginFunc = ({ email, password }) =>
    baseApiClient.post("auth/login", { json: { email, password } });

export default Login;
