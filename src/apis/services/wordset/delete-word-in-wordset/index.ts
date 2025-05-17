import { baseApiClient } from "../../../core/clients";
import { DeleteWordInWordsetFunc } from "./index.types";

const DeleteWordInWordset: DeleteWordInWordsetFunc = ({ setId, wordId }) =>
    baseApiClient.delete(`wordsets/${setId}/word/${wordId}`);

export default DeleteWordInWordset;
