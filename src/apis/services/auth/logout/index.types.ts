import { ApiFunc } from "../../types";

export type LogoutFunc = ApiFunc<void, LogoutResData>;

export type LogoutResData = Record<string, never>; // 빈 객체를 반환
