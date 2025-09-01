import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { queryClient } from "../../../routes/__root";
import { getDataFromApiRes } from "../../../apis/services";
import WordsetApi from "../../../apis/services/wordset";
import useWordsetListData from "./useWordsetListData";

const useCreateAndNavigate = () => {
    const navigate = useNavigate();
    const wordsetListData = useWordsetListData();

    const { mutate: createAndNavigate } = useMutation({
        mutationFn: async () => {
            if (!wordsetListData) return;

            const num = wordsetListData.content.reduce((max, wordset) => {
                const match = wordset.setName.match(/Wordset(\d+)/);
                const number = match ? parseInt(match[1], 10) : 0;
                return Math.max(max, number);
            }, 0);

            // const num = 1;
            const newSetName = `Wordset${num + 1}`;

            const res = WordsetApi.CreateWordset({ setName: newSetName });
            const data = await getDataFromApiRes(res);

            if (!data) return;
            navigate({
                to: `/wordset/${data.setId}`,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["wordsetList"],
            });
        },
    });

    return () => createAndNavigate();
};

export default useCreateAndNavigate;
