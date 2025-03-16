import { ResponsePromise } from "ky";
import { WrappedObject } from "../../core/type";
import apiClient from "../../core/clients";

type WordInSet = {
    wordId: number;
    word: string;
    noun: string[];
    verb: string[];
    adjective: string[];
    adverb: string[];
    createdAt: string;
    gpt: boolean;
};

type GetWordsInWordSetResponseData = {
    code: string;
    data: WordInSet[];
};

const GetWordsInWordSetRequest = (
    setId: number,
): ResponsePromise<WrappedObject<GetWordsInWordSetResponseData>> =>
    apiClient.get(`wordsets/${setId}`);

export default GetWordsInWordSetRequest;
