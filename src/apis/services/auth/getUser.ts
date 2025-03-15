import { ResponsePromise } from "ky";
import KyInstance from "../../core/ky";
import { WrappedObject } from "../../core/type";

type GetUserResponse = {
    username: string;
    email: string;
};

const GetUserRequest = (): ResponsePromise<WrappedObject<GetUserResponse>> =>
    KyInstance.get("auth/user");

export default GetUserRequest;
