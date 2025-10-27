import { baseApiClient } from "../../../core/clients";
import { SpellingCheckFunc } from "./index.types";

const SpellingCheck: SpellingCheckFunc = ({ word }) =>
  baseApiClient.post("word/spelling-error", { json: { word } });

export default SpellingCheck;
