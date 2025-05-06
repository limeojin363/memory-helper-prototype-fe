import { ResponsePromise } from "ky";
import apiClient from "../../core/clients";
import { WrappedObject } from "../../core/type";



export type PairItem = {
    id: number;
    word: string;
    noun: string[];
    verb: string[];
    adjective: string[];
    adverb: string[];
    createdAt: string;
    gpt: boolean;
};

const GetMyWordSetDetailRequest = (
    wordSetId: number,
): ResponsePromise<WrappedObject<PairItem[]>> =>
    apiClient.get(`wordsets/${wordSetId}`);

export default GetMyWordSetDetailRequest;
