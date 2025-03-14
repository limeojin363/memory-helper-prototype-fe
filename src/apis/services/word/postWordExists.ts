import { ResponsePromise } from "ky";
import { WrappedObject } from "../../core/type";
import KyInstance from "../../core/ky";

type PostWordExistsResponseData = {
    wordId: number;
    word: string;
    noun: string[];
    verb: string[];
    adjective: string[];
    adverb: string[];
    gpt: boolean;
};

const PostWordExistsRequest = (
    word: string,
): ResponsePromise<WrappedObject<PostWordExistsResponseData>> =>
    KyInstance.post("word/exists", { json: { word } });

export default PostWordExistsRequest;
