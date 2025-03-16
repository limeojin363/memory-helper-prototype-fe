import GetUserRequest from "./getUser";
import LoginRequest from "./login";
import LogoutRequest from "./logout";
import SignupRequest from "./signup";
import TokenRefreshRequest from "./token-refresh";

const HttpAuthRequests = {
    Login: LoginRequest,
    Logout: LogoutRequest,
    Signup: SignupRequest,
    GetUser: GetUserRequest,
    TokenRefresh: TokenRefreshRequest,
};

export default HttpAuthRequests;
