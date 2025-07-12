import { ApiFunc } from "../../types";

export type DeleteExamFunc = ApiFunc<DeleteExamReqParam, DeleteExamResData>;

export type DeleteExamReqParam = {
    examId: number;
};

export type DeleteExamResData = {
    testId: string;
    setName: string;
    deletedAt: string;
};
