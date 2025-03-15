import { useQuery } from "@tanstack/react-query";
import { ComponentViewDataItem } from "../components/WordSetList";
import HTTPWordSetRequest from "../../../apis/services/word-set";
import { PairItem } from "../../../apis/services/word-set/getMyWordSetDetail";

const typeList = ["noun", "verb", "adjective", "adverb"] as const;

export class ListDataConverter {
    createdAt: Date;
    list: ComponentViewDataItem[];

    constructor(data: PairItem[]) {
        this.createdAt = data[0] ? new Date(data[0].createdAt) : new Date();
        this.list = data.map(
            (item) => new WordConverter.ServerToClient(item).clientData,
        );
    }
}

export const WordConverter = {
    ServerToClient: class {
        clientData: ComponentViewDataItem;
        constructor(data: {
            word: string;
            noun: string[];
            verb: string[];
            adjective: string[];
            adverb: string[];
        }) {
            this.clientData = {
                engWord: data.word,
                korWords: typeList
                    .map((type) => data[type].map((word) => ({ word, type })))
                    .flat(),
            };
        }
    },
};

const useWordSetDetailData = (wordSetId: string) => {
    const { data, isPending, isError } = useQuery({
        queryKey: ["wordSetDetail", wordSetId],
        queryFn: async () => {
            try {
                const { data } = await (
                    await HTTPWordSetRequest.GetMyWordSetDetail(wordSetId)
                ).json();

                const converted = new ListDataConverter(data);
                console.log(converted);

                return converted;
            } catch (error) {
                console.error(error);
                return null;
            }
        },
    });

    return { data, isPending, isError };
};

export default useWordSetDetailData;
