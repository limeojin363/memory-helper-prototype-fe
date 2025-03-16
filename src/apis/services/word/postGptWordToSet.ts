import { ResponsePromise } from "ky";
import { WrappedObject } from "../../core/type";
import apiClient from "../../core/clients";

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
    apiClient.post(`wordsets/gpt/${setId}`, { json: requestData });

export default PostGptWordToSetRequest;
