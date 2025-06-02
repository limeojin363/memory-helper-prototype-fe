import { baseApiClient } from "../../../core/clients";
import { GetUserInfoFunc } from "./index.types";

const GetUserInfo: GetUserInfoFunc = () => baseApiClient.get("auth/user-info");

export default GetUserInfo;
