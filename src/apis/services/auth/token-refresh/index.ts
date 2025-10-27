import { baseApiClient } from "../../../core/clients";
import { TokenRefreshFunc } from "./index.types";

const TokenRefresh: TokenRefreshFunc = ({ refreshToken }) =>
  baseApiClient.post("auth/token-refresh", { json: { refreshToken } });

export default TokenRefresh;
