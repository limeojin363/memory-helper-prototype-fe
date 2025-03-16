import apiClient from "../../core/clients";
import { WrappedObject } from "../../core/type";

type WordSetDTO = {
    setId: number;
    setName: string;
    createdAt: string;
    problemSetsCount: number;
};

type GetMyWordSetsResponse = WordSetDTO[];

const GetMyWordSetsRequest = async () =>
    apiClient.get<WrappedObject<GetMyWordSetsResponse>>("wordsets/all").json();

export default GetMyWordSetsRequest;
