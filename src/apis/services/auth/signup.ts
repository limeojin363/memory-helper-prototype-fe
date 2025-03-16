import { baseApiClient } from "../../core/clients";

type SignupBody = {
    username: string;
    email: string;
    password: string;
};

const SignupRequest = (body: SignupBody) =>
    baseApiClient.post("auth/signup", { json: body });

export default SignupRequest;
