import { baseApiClient } from "../../../core/clients";
import { DeleteWordsetFunc } from "./index.types";

const DeleteWordset: DeleteWordsetFunc = ({ id }) =>
    baseApiClient.delete(`wordsets/${id}`);

export default DeleteWordset;
