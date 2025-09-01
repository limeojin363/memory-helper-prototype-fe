import { ApiFunc } from "../../types";

export type RenameExamFunc = ApiFunc<
    RenameExamReqParam,
    unknown
>;

export type RenameExamReqParam = {
    examId: number; // 시험 ID
    examName: string; // 새 시험 이름
};