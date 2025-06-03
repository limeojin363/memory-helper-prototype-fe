import { useQuery } from "@tanstack/react-query";
import WordsetApi from "../../../apis/services/wordset";
import { getDataFromApiRes } from "../../../apis/services";

// Todo: apply dnd-kit
const useWordsetListData = () => {
    const { data } = useQuery({
        queryKey: ["wordsetList"],
        queryFn: async () => {
            const res = WordsetApi.GetAllWordsets();
            return getDataFromApiRes(res);
        },
    });

    return data;
};

export default useWordsetListData;
