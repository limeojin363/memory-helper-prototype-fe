import { useQuery } from "@tanstack/react-query";
import { ComponentViewDataItem } from "../components/WordSetList";
import HTTPWordSetRequest from "../../../apis/services/word-set";
import { PairItem } from "../../../apis/services/word-set/getMyWordSetDetail";

const typeList = ["noun", "verb", "adjective", "adverb"] as const;

class ConvetedWordSetData {
    createdAt: Date;
    list: ComponentViewDataItem[];

    constructor(data: PairItem[]) {
        this.createdAt = data[0] ? new Date(data[0].createdAt) : new Date();
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

const useWordSetDetailData = (wordSetId: string) => {
    const { data, isPending, isError } = useQuery({
        queryKey: ["wordSetDetail", wordSetId],
        queryFn: async () => {
            try {
                const { data } = await (
                    await HTTPWordSetRequest.GetMyWordSetDetail(wordSetId)
                ).json();

                const converted = new ConvetedWordSetData(data);
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
