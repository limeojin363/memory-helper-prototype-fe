import { baseApiClient } from "../../../core/clients";
import { CreateWordsetFunc } from "./index.types";

const CreateWordset: CreateWordsetFunc = ({ setName }) =>
    baseApiClient.post("wordsets", { json: { setName } });

export default CreateWordset;
