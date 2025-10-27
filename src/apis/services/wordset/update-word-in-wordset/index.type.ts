import { ApiFunc } from "../../types";

export type UpdateWordsetFunc = ApiFunc<
  UpdateWordsetReqParam,
  UpdateWordsetResData
>;

export type UpdateWordsetReqParam = {
  setId: number; // 단어장의 id
  wordId: number; // 단어의 id
  meaning: Array<{
    type: string; // 품사 (e.g., noun, verb)
    value: string; // 단어의 의미
  }>;
};

export type UpdateWordsetResData = {
  wordId: number;
  word: string;
  meaning: Array<{
    type: string;
    value: string;
  }>;
};
