import { baseApiClient } from "../../../core/clients";
import { GetAllWordsetsFunc } from "./index.types";

const GetAllWordsets: GetAllWordsetsFunc = () =>
    baseApiClient.get("wordsets/all");

export default GetAllWordsets;
