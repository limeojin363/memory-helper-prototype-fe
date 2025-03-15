import { ResponsePromise } from "ky";
import { WrappedObject } from "../../core/type";
import KyInstance from "../../core/ky";

type PostGptWordToSetRequestData = {
    word: string;
    noun: string[];
    verb: string[];
    adjective: string[];
    adverb: string[];
};

type PostGptWordToSetResponseData = {
    wordId: number;
    word: string;
    noun: string[];
    verb: string[];
    adjective: string[];
    adverb: string[];
};

const PostGptWordToSetRequest = (
    setId: number,
    requestData: PostGptWordToSetRequestData,
): ResponsePromise<WrappedObject<PostGptWordToSetResponseData>> =>
    KyInstance.post(`wordsets/gpt/${setId}`, { json: requestData });

export default PostGptWordToSetRequest;
