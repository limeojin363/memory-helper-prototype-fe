import { ApiFunc } from "../types";

export type GetResultFunc = ApiFunc<GetResultReqParam, GetExamResData>;

export type GetResultReqParam = { resultId: number };

export type GetExamResData = {
    createdAt: string;
    examId: number;
    examName: string;
    sourceWordSetId: number;
    sourceWordSetName: string;
    problemResultList: ProblemResult[];
};

export interface ProblemResult {
    problemId: number;
    problemNumber: number;
    question: string;
    multipleChoice: Array<{
        id: string;
        value: string;
    }>;
    userAnswers: {
        id: string;
        value: string;
    };
    rightAnswers: {
        id: string;
        value: string;
    };
}
