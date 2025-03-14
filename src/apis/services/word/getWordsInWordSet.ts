import { ResponsePromise } from "ky";
import { WrappedObject } from "../../core/type";
import KyInstance from "../../core/ky";

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
    KyInstance.get(`wordsets/${setId}`);

export default GetWordsInWordSetRequest;
