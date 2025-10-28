import { ApiFunc } from "../../types";

export type GetUserInfoFunc = ApiFunc<void, GetUserInfoResData>;

export type GetUserInfoResData = {
  username: string;
  email: string;
};
