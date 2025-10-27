import authenticatedApiClient from "../../../core/clients";
import { UpdateWordsetFunc } from "./index.type";

const UpdateWordInWordset: UpdateWordsetFunc = ({ setId, wordId, meaning }) =>
  authenticatedApiClient.patch(`wordsets/${setId}/word/${wordId}`, {
    json: { meaning },
  });

export default UpdateWordInWordset;
