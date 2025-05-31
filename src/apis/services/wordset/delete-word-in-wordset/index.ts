import authenticatedApiClient from "../../../core/clients";
import { DeleteWordInWordsetFunc } from "./index.types";

const DeleteWordInWordset: DeleteWordInWordsetFunc = ({ setId, wordId }) =>
    authenticatedApiClient.delete(`wordsets/${setId}/word/${wordId}`);

export default DeleteWordInWordset;
