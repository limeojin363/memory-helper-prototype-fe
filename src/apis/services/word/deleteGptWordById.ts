import { ResponsePromise } from "ky";
import { WrappedObject } from "../../core/type";
import apiClient from "../../core/clients";

type DeleteGptWordResponseData = {
    wordId: number;
    word: string;
    noun: string[];
    verb: string[];
    adjective: string[];
    adverb: string[];
};

const DeleteGptWordRequest = (
    id: number,
): ResponsePromise<WrappedObject<DeleteGptWordResponseData>> =>
    apiClient.delete(`word/gpt/${id}`);

export default DeleteGptWordRequest;
