import { useMutation, useQuery } from "@tanstack/react-query";
import WordsetApi from "../../../apis/services/wordset";
import { getDataFromApiRes } from "../../../apis/services";
import { queryClient } from "../../../routes/__root";
import { useEffect } from "react";

export const useWordsetDetailData = () => {
    const wordsetId = useWordsetId();
    const { data, refetch } = useQuery({
        queryKey: ["wordsetDetail", wordsetId],
        queryFn: async () => {
            console.log("Fetching wordset detail for ID:", wordsetId);
            if (!wordsetId) return null;

            const res = WordsetApi.GetWordsetDetail({ id: wordsetId });
            return getDataFromApiRes(res);
        },
        initialData: null,
    });

    // 이론상 쓸데없는 코드. 지울 수 있을 때 지우기.
    useEffect(() => {
        refetch();
    }, [refetch, wordsetId]);

    return data;
};

// create 감지
export const useWordsetId = () => {
    const mutationCache = queryClient.getMutationCache();
    mutationCache.subscribe((event) => {
        if (event.type === "updated") {
            const mutation = event.mutation;
            if (
                mutation?.options?.mutationKey &&
                mutation?.options?.mutationKey[0] === "createWordset"
            ) {
                // wordsetId를 업데이트하는 로직
                const data = mutation.state.data as { setId: number };
                if (data) {
                    queryClient.setQueryData(["wordsetId"], data.setId);
                }
            }
        }
    });

    return queryClient.getQueryData<number | null>(["wordsetId"]) || null;
};

export const useInitializeWordset = () => {
    const { mutate } = useMutation({
        mutationFn: async (setName: string) => {
            const res = WordsetApi.CreateWordset({ setName });
            return getDataFromApiRes(res);
        },
        mutationKey: ["createWordset"],
    });

    return (setName: string) => mutate(setName);
};
