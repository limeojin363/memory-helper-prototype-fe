import { ResponsePromise } from "ky";
import apiClient from "../../core/clients";
import { WrappedObject } from "../../core/type";

export type CreateWordSetRequest = {
    setName: string;
};

export type CreateWordSetResponse = {
    setId: number;
    setName: string;
};

const createNewWordSet = (
    request: CreateWordSetRequest,
): ResponsePromise<WrappedObject<CreateWordSetResponse>> =>
    apiClient.post("wordsets", { json: request });

export default createNewWordSet;
