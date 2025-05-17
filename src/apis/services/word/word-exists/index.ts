import { baseApiClient } from "../../../core/clients";
import { WordExistsFunc } from "./index.types";

const WordExists: WordExistsFunc = ({ word }) =>
    baseApiClient.post("word/exists", { json: { word } });

export default WordExists;
