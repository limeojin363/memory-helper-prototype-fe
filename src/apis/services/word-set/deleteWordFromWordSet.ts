import { ResponsePromise } from "ky";
import { WrappedObject } from "../../core/type";
import apiClient from "../../core/clients";

type DeleteWordFromSetResponseData = {
    wordId: number;
    word: string;
    noun: string[];
    verb: string[];
    adjective: string[];
    adverb: string[];
};

const DeleteWordFromSetRequest = (
    setId: number,
    wordId: number,
): ResponsePromise<WrappedObject<DeleteWordFromSetResponseData>> =>
    apiClient.delete(`wordsets/${setId}/word/${wordId}`);

export default DeleteWordFromSetRequest;
