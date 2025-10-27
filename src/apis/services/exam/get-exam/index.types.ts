import { ApiFunc } from "../../types";

export type GetExamFunc = ApiFunc<GetExamReqParam, GetExamResData>;

export type GetExamReqParam = {
  examId: number;
};

export type GetExamResData = {
  createdAt: Date;
  examId: number;
  examName: string;
  sourceWordSetId: number;
  sourceWordSetName: string;
  problemResponses: Problem[];
  resultResponses:
    | null
    | {
        resultId: number;
        createdAt: string;
        totalProblemsNum: number;
        correctedAnswersNum: number;
      }[];
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
  value: string;
};
