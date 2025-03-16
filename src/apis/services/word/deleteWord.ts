import { ResponsePromise } from "ky";
import { WrappedObject } from "../../core/type";
import apiClient from "../../core/clients";

type DeleteWordResponseData = {
    wordId: number;
    word: string;
    noun: string[];
    verb: string[];
    adjective: string[];
    adverb: string[];
};

const DeleteWordRequest = (
    id: number,
): ResponsePromise<WrappedObject<DeleteWordResponseData>> =>
    apiClient.delete(`word/${id}`);

export default DeleteWordRequest;
