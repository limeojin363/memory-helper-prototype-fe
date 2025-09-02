import authenticatedApiClient from "@/apis/core/clients";
import { GetResultFunc } from "./types";

const GetResult: GetResultFunc = ({ resultId }) =>
    authenticatedApiClient.get(`result/${resultId}`);

export default GetResult;
