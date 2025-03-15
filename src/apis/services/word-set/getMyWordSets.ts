import { ResponsePromise } from "ky";
import KyInstance from "../../core/ky";
import { WrappedObject } from "../../core/type";

type WordSetDTO = {
    setId: number;
    setName: string;
    createdAt: string;
    problemSetsCount: number;
};

type GetMyWordSetsResponse = WordSetDTO[];

const GetMyWordSetsRequest = (): ResponsePromise<
    WrappedObject<GetMyWordSetsResponse>
> => KyInstance.get("wordsets/all");

export default GetMyWordSetsRequest;
