import authenticatedApiClient from "../../../core/clients";
import { AddWordToSetFunc } from "./index.types";

const AddWordToWordset: AddWordToSetFunc = ({ setId, word, meaning }) =>
    authenticatedApiClient.post(`wordsets/${setId}`, { json: { word, meaning } });

export default AddWordToWordset;