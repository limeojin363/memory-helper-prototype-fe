import { ApiFunc } from "../../types";

export type AddWordToSetFunc = ApiFunc<
    AddWordToSetReqParam,
    AddWordToSetResData
>;

export type AddWordToSetReqParam = {
    setId: number; // 단어장 ID
    word: string;
    meaning: Array<{
        type: string; // 품사 (e.g., noun, verb)
        value: string; // 단어의 의미
    }>;
};

export type AddWordToSetResData = {
    wordId: number;
    word: string;
    meaning: Array<{
        type: string;
        value: string;
    }>;
    gpt: boolean; // GPT에서 생성된 결과인지 여부
};
