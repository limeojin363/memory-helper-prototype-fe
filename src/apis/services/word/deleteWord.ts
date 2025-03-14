import { ResponsePromise } from "ky";
import { WrappedObject } from "../../core/type";
import KyInstance from "../../core/ky";

type DeleteWordResponseData = {
    wordId: number;
    word: string;
    noun: string[];
    verb: string[];
    adjective: string[];
    adverb: string[];
};

const DeleteWordRequest = (
    id: number,
): ResponsePromise<WrappedObject<DeleteWordResponseData>> =>
    KyInstance.delete(`word/${id}`);

export default DeleteWordRequest;
