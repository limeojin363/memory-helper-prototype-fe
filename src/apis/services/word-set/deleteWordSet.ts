import { ResponsePromise } from "ky";
import apiClient from "../../core/clients";
import { WrappedObject } from "../../core/type";

type DeleteWordSetResponseData = {
    setId: number;
    setName: string;
};

const DeleteWordSetRequest = (
    wordSetId: number,
): ResponsePromise<WrappedObject<DeleteWordSetResponseData>> =>
    apiClient.delete(`wordsets/${wordSetId}`);

export default DeleteWordSetRequest;
