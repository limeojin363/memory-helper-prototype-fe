import { ResponsePromise } from "ky";
import { WrappedObject } from "../../core/type";
import apiClient from "../../core/clients";

type DeleteWordFromWordSetResponseData = {
    wordId: number;
    word: string;
    noun: string[];
    verb: string[];
    adjective: string[];
    adverb: string[];
};

const DeleteWordFromWordSetRequest = (
    setId: number,
    wordId: number,
): ResponsePromise<WrappedObject<DeleteWordFromWordSetResponseData>> =>
    apiClient.delete(`wordsets/${setId}/word/${wordId}`);

export default DeleteWordFromWordSetRequest;
