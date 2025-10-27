import { TypeKey } from "../../../../components/type-selector/TypeSelector";
import { ApiFunc } from "../../types";

export type GetWordsetDetailFunc = ApiFunc<
  GetWordsetDetailParam,
  GetWordsetDetailData
>;

export type GetWordsetDetailParam = {
  id: number; // 단어셋 ID
};

export type GetWordsetDetailData = {
  name: string;
  list: Array<{
    wordId: number;
    word: string;
    meaning: Array<{
      type: TypeKey; // 품사 (e.g., noun, verb, adjective, adverb)
      value: string; // 단어의 의미
    }>;
    createdAt: string;
    gpt: boolean; // GPT에서 생성된 결과인지 여부
  }>;
  examIds: number[];
};
