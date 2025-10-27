import { ApiFunc } from "../../types";

export type CreateExamFunc = ApiFunc<CreateExamReqParam, CreateExamResData>;

export type CreateExamReqParam = {
  setId: number; // 단어장 ID
};

export type CreateExamResData = {
  examId: number;
  examList: Array<{
    problemNumber: number;
    multipleChoice: Array<{
      id: number;
      meaning: string;
    }>;
  }>;
  question: string; // "다음 중 'letter'의 해석로 가장 적절한 것은 무엇입니까?"
  answer: string; // "1"
};
