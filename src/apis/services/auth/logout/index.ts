import { baseApiClient } from "../../../core/clients";
import { LogoutFunc } from "./index.types";

const Logout: LogoutFunc = () => baseApiClient.post("auth/logout");

export default Logout;
