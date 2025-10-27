import { ApiFunc } from "../../types";

export type CreateWordsetFunc = ApiFunc<
  CreateWordsetReqBody,
  CreateWordsetResData
>;

export type CreateWordsetReqBody = {
  setName: string;
};

export type CreateWordsetResData = {
  setId: number;
  setName: string;
};
