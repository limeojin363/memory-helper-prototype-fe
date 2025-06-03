import { useQuery } from "@tanstack/react-query";
import WordsetApi from "../../../apis/services/wordset";
import { getDataFromApiRes } from "../../../apis/services";

const useWordSetDetailData = (wordSetId: number) => {
    const { data, isPending, isError } = useQuery({
        queryKey: ["wordSetDetail", wordSetId],
        queryFn: async () => {
            try {
                const res = WordsetApi.GetWordsetDetail({ id: wordSetId });
                const data = await getDataFromApiRes(res);
                return data;
            } catch (err) {
                console.log(err);
                return;
            }
        },
    });

    return { data, isPending, isError };
};

export default useWordSetDetailData;
