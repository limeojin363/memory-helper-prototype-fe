import { useQuery } from "@tanstack/react-query";

type CreatedPairType = {
    id: number;
    word: string;
    noun: string[];
    verb: string[];
    adjective: string[];
    adverb: string[];
    createdAt: string;
    gpt: boolean;
};

type ResponseType = CreatedPairType[];

const mockedApiCall = async (id: string): Promise<ResponseType> => {
    const response = await fetch(`/api/wordSet/${id}`);
    return [
        {
            id: 0,
            word: "string",
            noun: ["string"],
            verb: ["string"],
            adjective: ["string"],
            adverb: ["string"],
            createdAt: "2025-03-03T01:39:42.002Z",
            gpt: true,
        },
    ];
};

const useWordSetDetailData = (wordSetId: string) => {
    const { data, isPending, isError } = useQuery({
        queryKey: ["wordSetDetail", wordSetId],
        queryFn: () => {
            return mockedApiCall(wordSetId);
        },
    });

    return { data, isPending, isError };
};

export default useWordSetDetailData;
