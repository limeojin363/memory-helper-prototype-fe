import { ApiFunc } from "../../index.types";

export type GetUserInfoFunc = ApiFunc<void, GetUserInfoResData>;

export type GetUserInfoResData = {
    id: string;
    username: string;
    email: string;
    roles: string[];
};
