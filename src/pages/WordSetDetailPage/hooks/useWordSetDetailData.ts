import { useQuery } from "@tanstack/react-query";
import { ComponentViewDataItem } from "../components/WordSetList";

type ApiResponseType = {
    id: number;
    word: string;
    noun: string[];
    verb: string[];
    adjective: string[];
    adverb: string[];
    createdAt: string;
    gpt: boolean;
}[];

const typeList = ["noun", "verb", "adjective", "adverb"] as const;

class ConvetedWordSetData {
    createdAt: Date;
    list: ComponentViewDataItem[];

    constructor(data: ApiResponseType) {
        this.createdAt = new Date(data[0].createdAt);
        this.list = data
            .map((item) =>
                typeList.map((type) => {
                    return {
                        engWord: item.word,
                        korWords: item[type].map((word) => ({ word, type })),
                    };
                }),
            )
            .flat();
    }
}

const mockedApiCall = async (id: string): Promise<ApiResponseType> => {
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
        queryFn: async () => {
            const responseData = await mockedApiCall(wordSetId);
            return new ConvetedWordSetData(responseData);
        },
    });

    return { data, isPending, isError };
};

export default useWordSetDetailData;
