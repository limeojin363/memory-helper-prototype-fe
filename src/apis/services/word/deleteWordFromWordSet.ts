import { ResponsePromise } from "ky";
import { WrappedObject } from "../../core/type";
import KyInstance from "../../core/ky";

type DeleteWordFromWordSetResponseData = {
    wordId: number;
    word: string;
    noun: string[];
    verb: string[];
    adjective: string[];
    adverb: string[];
};

const DeleteWordFromWordSetRequest = (
    setId: number,
    wordId: number,
): ResponsePromise<WrappedObject<DeleteWordFromWordSetResponseData>> =>
    KyInstance.delete(`wordsets/${setId}/word/${wordId}`);

export default DeleteWordFromWordSetRequest;
