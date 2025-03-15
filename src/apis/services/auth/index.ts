import GetUserRequest from "./getUser";
import LoginRequest from "./login";
import LogoutRequest from "./logout";
import SignupRequest from "./signup";

const HttpAuthRequests = {
    Login: LoginRequest,
    Logout: LogoutRequest,
    Signup: SignupRequest,
    GetUser: GetUserRequest,
};

export default HttpAuthRequests;
