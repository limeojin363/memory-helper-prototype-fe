import { ResponsePromise } from "ky";
import { ResponseBody } from "./types";

export const getDataFromApiRes = async <T>(
  res: ResponsePromise<ResponseBody<T>>,
): Promise<T> => (await res.json()).data;
