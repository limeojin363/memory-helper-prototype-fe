import { ApiFunc } from "../../types";

export type SpellingCheckFunc = ApiFunc<
  SpellingCheckReqBody,
  SpellingCheckResData
>;

export type SpellingCheckReqBody = {
  word: string;
};

export type SpellingCheckResData = string;
