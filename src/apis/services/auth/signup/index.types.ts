import { ApiFunc } from "../../types";

export type SignupFunc = ApiFunc<SignupReqBody, SignupResData>;

export type SignupReqBody = {
  username: string;
  email: string;
  password: string;
};

export type SignupResData = {
  username: string;
  email: string;
};
