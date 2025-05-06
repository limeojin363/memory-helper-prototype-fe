import { ResponsePromise } from "ky";
import apiClient from "../../core/clients";
import { WrappedObject } from "../../core/type";

export type AddGptWordRequest = {
    word: string;
    noun: string[];
    verb: string[];
    adjective: string[];
    adverb: string[];
};

export type AddGptWordResponse = {
    wordId: number;
    word: string;
    noun: string[];
    verb: string[];
    adjective: string[];
    adverb: string[];
};

const addGptWordToSet = (
    setId: number,
    request: AddGptWordRequest,
): ResponsePromise<WrappedObject<AddGptWordResponse>> =>
    apiClient.post(`wordsets/gpt/${setId}`, { json: request });

export default addGptWordToSet;
