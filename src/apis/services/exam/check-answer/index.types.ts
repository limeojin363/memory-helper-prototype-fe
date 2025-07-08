import { ApiFunc } from "../../types";

export type CheckAnswerFunc = ApiFunc<
    CheckAnswerReqParam,
    CheckAnswerResData
>;

export type CheckAnswerReqParam = {
    examId: number; // 시험 ID
    checkedAnswers: number[]; // 체크된 답안들의 배열
};

export type CheckAnswerResData = {
    // API 응답 데이터 타입 (이미지에서 응답 스키마가 명확하지 않아 기본 구조로 작성)
    success: boolean;
    message?: string;
};
