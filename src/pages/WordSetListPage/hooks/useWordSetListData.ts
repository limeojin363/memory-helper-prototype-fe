import { useQuery } from "@tanstack/react-query";
import GetMyWordSetsRequest from "../../../apis/services/word-set/getMyWordSets";

const useWordSetListData = () => {
    const { data } = useQuery({
        queryKey: ["wordSetList"],
        queryFn: async () => {
            const { data } = await (await GetMyWordSetsRequest()).json();

            return data;
        },
    });

    return data;
};

export default useWordSetListData;
