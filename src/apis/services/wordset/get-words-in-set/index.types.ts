import { ApiFunc } from "../../index.types";

export type GetWordsInWordsetFunc = ApiFunc<GetWordsInWordsetReqParam, GetWordsInWordsetResData>;

export type GetWordsInWordsetReqParam = {
    id: number; // 단어셋 ID
};

export type GetWordsInWordsetResData = Array<{
    wordId: number;
    word: string;
    meaning: Array<{
        type: string; // 품사 (e.g., noun, verb, adjective, adverb)
        value: string; // 단어의 의미
    }>;
    createdAt: string; // 단어 생성 날짜
    gpt: boolean; // GPT에서 생성된 결과인지 여부
}>;