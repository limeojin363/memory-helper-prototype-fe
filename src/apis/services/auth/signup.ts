import KyInstance from "../../core/ky";

type SignupBody = {
    username: string;
    email: string;
    password: string;
};

const SignupRequest = (body: SignupBody) =>
    KyInstance.post("auth/signup", { json: body });

export default SignupRequest;
