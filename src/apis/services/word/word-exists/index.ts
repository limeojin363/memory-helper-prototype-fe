import authenticatedApiClient from "../../../core/clients";
import { WordExistsFunc } from "./index.types";

const WordExists: WordExistsFunc = ({ word }) =>
    authenticatedApiClient.post("word/exists", { json: { word } });

export default WordExists;
