import { ResponsePromise } from "ky";
import { WrappedObject } from "../../core/type";
import apiClient from "../../core/clients";

type PostExistingWordToSetResponseData = {
    wordId: number;
    word: string;
    noun: string[];
    verb: string[];
    adjective: string[];
    adverb: string[];
    isGpt: boolean;
};

const PostExistingWordToSetRequest = (
    setId: number,
    wordId: number,
): ResponsePromise<WrappedObject<PostExistingWordToSetResponseData>> =>
    apiClient.post(`wordsets/${setId}/word/${wordId}`);

export default PostExistingWordToSetRequest;
