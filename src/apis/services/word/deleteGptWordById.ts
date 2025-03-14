import { ResponsePromise } from "ky";
import { WrappedObject } from "../../core/type";
import KyInstance from "../../core/ky";

type DeleteGptWordResponseData = {
    wordId: number;
    word: string;
    noun: string[];
    verb: string[];
    adjective: string[];
    adverb: string[];
};

const DeleteGptWordRequest = (
    id: number,
): ResponsePromise<WrappedObject<DeleteGptWordResponseData>> =>
    KyInstance.delete(`word/gpt/${id}`);

export default DeleteGptWordRequest;
