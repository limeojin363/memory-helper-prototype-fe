import { ResponsePromise } from "ky";
import { WrappedObject } from "../../core/type";
import apiClient from "../../core/clients";

type PostWordToSetRequestData = {
    word: string;
    noun: string[];
    verb: string[];
    adjective: string[];
    adverb: string[];
};

type PostWordToSetResponseData = {
    wordId: number;
    word: string;
    noun: string[];
    verb: string[];
    adjective: string[];
    adverb: string[];
};

const PostWordToSetRequest = (
    setId: number,
    data: PostWordToSetRequestData,
): ResponsePromise<WrappedObject<PostWordToSetResponseData>> =>
    apiClient.post(`wordsets/${setId}`, { json: data });

export default PostWordToSetRequest;