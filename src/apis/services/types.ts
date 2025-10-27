import { ResponsePromise } from "ky";

type Code = "OK";

export type ResponseBody<T> = {
  code: Code;
  data: T;
};

export type ApiFunc<ReqParam, ResData> = (
  reqBody: ReqParam,
) => ResponsePromise<ResponseBody<ResData>>;
