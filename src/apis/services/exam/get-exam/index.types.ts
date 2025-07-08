import { ApiFunc } from "../../types";

export type GetExamFunc = ApiFunc<
    GetExamReqParam,
    GetExamResData
>;

export type GetExamReqParam = {
    examId: number;
};

export type GetExamResData = {
    code: string;
    data: Problem[];
};

export type Problem = {
    problemId: number;
    problemNumber: number;
    question: string;
    multipleChoice: MultipleChoice[];
    answer: string;
};

export type MultipleChoice = {
    id: string;
    meaning: string;
};
