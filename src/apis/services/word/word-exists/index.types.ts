import { TypeKey } from "../../../../components/type-selector/TypeSelector";
import { ApiFunc } from "../../types";

export type WordExistsFunc = ApiFunc<WordExistsReqBody, WordExistsResData>;

export type WordExistsReqBody = {
  word: string;
};

// 단어가 DB에 존재하는 경우의 응답 타입
export type WordExistsInDbResData = {
  wordId: number; // 단어 ID
  word: string;
  meaning: Array<{
    type: TypeKey; // 품사 (e.g., noun, verb)
    value: string; // 단어의 의미
  }>;
  gpt: false; // GPT에서 생성된 결과가 아님
};

// 단어가 DB에 없고 GPT에서 생성된 경우의 응답 타입
export type WordExistsFromGptResData = {
  meaning: Array<{
    type: TypeKey; // 품사 (e.g., noun, verb)
    value: string; // 단어의 의미
  }>;
  gpt: true; // GPT에서 생성된 결과임
};

// 두 경우를 결합
export type WordExistsResData =
  | WordExistsInDbResData
  | WordExistsFromGptResData;
