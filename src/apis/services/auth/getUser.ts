import { ResponsePromise } from "ky";
import { WrappedObject } from "../../core/type";
import { baseApiClient } from "../../core/clients";

type GetUserResponse = {
    username: string;
    email: string;
};

const GetUserRequest = (): ResponsePromise<WrappedObject<GetUserResponse>> =>
    baseApiClient.get("auth/user");

export default GetUserRequest;
