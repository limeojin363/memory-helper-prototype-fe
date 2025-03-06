import LoginRequest from "./login";
import LogoutRequest from "./logout";
import SignupRequest from "./signup";

const HttpAuthRequests = {
    Login: LoginRequest,
    Logout: LogoutRequest,
    Signup: SignupRequest,
};

export default HttpAuthRequests;
