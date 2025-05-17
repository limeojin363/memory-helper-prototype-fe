import { baseApiClient } from "../../../core/clients";
import { AddWordToSetFunc } from "./index.types";

const AddWordToWordset: AddWordToSetFunc = ({ setId, word, meaning }) =>
    baseApiClient.post(`wordsets/${setId}`, { json: { word, meaning } });

export default AddWordToWordset;