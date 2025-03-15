import { ResponsePromise } from "ky";
import KyInstance from "../../core/ky";
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
    wordSetId: string,
): ResponsePromise<WrappedObject<PairItem[]>> =>
    KyInstance.get(`wordsets/${wordSetId}`);

export default GetMyWordSetDetailRequest;
