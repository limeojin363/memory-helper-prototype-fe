import { ApiFunc } from "../../types";

export type GetAllWordsetsFunc = ApiFunc<void, GetAllWordsetsResData>;

export type GetAllWordsetsResData = Array<{
    setId: number;
    setName: string;
    wordCount: number; // 단어 개수
    testSetsCount: number; // 테스트 세트 개수
    createdAt: string; // 생성 날짜
}>;
