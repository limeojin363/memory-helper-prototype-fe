import authenticatedApiClient from "../../../core/clients";
import { RenameWordsetFunc } from "./index.types";

const RenameWordset: RenameWordsetFunc = ({ id, setName }) =>
    authenticatedApiClient.patch(`wordsets/name/${id}`, { json: { setName } });

export default RenameWordset;
