import authenticatedApiClient from "../../../core/clients";
import { DeleteWordsetFunc } from "./index.types";

const DeleteWordset: DeleteWordsetFunc = ({ id }) =>
  authenticatedApiClient.delete(`wordsets/${id}`);

export default DeleteWordset;
