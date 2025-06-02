import authenticatedApiClient from "../../../core/clients";
import { GetAllWordsetsFunc } from "./index.types";

const GetAllWordsets: GetAllWordsetsFunc = () =>
    authenticatedApiClient.get("wordsets/all");

export default GetAllWordsets;
