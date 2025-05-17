import { baseApiClient } from "../../../core/clients";
import { GetWordsInWordsetFunc } from "./index.types";

const GetWordsInWordset: GetWordsInWordsetFunc = ({ id }) =>
    baseApiClient.get(`wordsets/${id}`);

export default GetWordsInWordset;
