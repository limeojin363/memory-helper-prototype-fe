import authenticatedApiClient from "../../../core/clients";
import { CreateWordsetFunc } from "./index.types";

const CreateWordset: CreateWordsetFunc = ({ setName }) =>
  authenticatedApiClient.post("wordsets", { json: { setName } });

export default CreateWordset;
