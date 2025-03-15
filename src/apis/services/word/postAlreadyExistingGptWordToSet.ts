import { ResponsePromise } from "ky";
import { WrappedObject } from "../../core/type";
import KyInstance from "../../core/ky";

type PostAlreadyExistingGptWordToSetResponseData = {
    wordId: number;
    word: string;
    noun: string[];
    verb: string[];
    adjective: string[];
    adverb: string[];
    isGpt: boolean;
};

const PostAlreadyExistingGptWordToSetRequest = (
    setId: number,
    wordId: number,
): ResponsePromise<
    WrappedObject<PostAlreadyExistingGptWordToSetResponseData>
> => KyInstance.post(`wordsets/${setId}/word/gpt/${wordId}`);

export default PostAlreadyExistingGptWordToSetRequest;
