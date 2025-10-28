import authenticatedApiClient from "../../../core/clients";
import { GetUserInfoFunc } from "./index.types";

const GetUserInfo: GetUserInfoFunc = () => authenticatedApiClient.get("auth/user");

export default GetUserInfo;
