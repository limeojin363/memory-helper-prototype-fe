import { ApiFunc } from "../../index.types";

export type DeleteWordInWordsetFunc = ApiFunc<DeleteWordInWordsetReqParam, DeleteWordInWordsetResData>;

export type DeleteWordInWordsetReqParam = {
    setId: number; // 단어셋 ID
    wordId: number; // 삭제할 단어 ID
};

export type DeleteWordInWordsetResData = {
    wordId: number;
    word: string;
    meaning: Array<{
        type: string; // 품사 (e.g., noun, verb)
        value: string; // 단어의 의미
    }>;
    gpt: boolean; // GPT에서 생성된 결과인지 여부
};
