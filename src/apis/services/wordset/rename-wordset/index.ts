import { baseApiClient } from "../../../core/clients";
import { RenameWordsetFunc } from "./index.types";

const RenameWordset: RenameWordsetFunc = ({ id, setName }) =>
    baseApiClient.patch(`wordsets/name/${id}`, { json: { setName } });

export default RenameWordset;
