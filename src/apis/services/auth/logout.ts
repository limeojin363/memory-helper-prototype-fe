import { baseApiClient } from "../../core/clients";

const LogoutRequest = () => baseApiClient.post("auth/logout");

export default LogoutRequest;
