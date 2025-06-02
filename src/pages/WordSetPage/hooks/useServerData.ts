import { useMutation, useQuery } from "@tanstack/react-query";
import WordsetApi from "../../../apis/services/wordset";
import { getDataFromApiRes } from "../../../apis/services";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { queryClient } from "../../../routes/__root";
export const useWordsetDetailData = () => {
    const wordsetId = useAtomValue(wordsetIdAtom);

    const { data } = useQuery({
        queryKey: ["wordsetDetail", wordsetId],
        queryFn: () => {
            const res = WordsetApi.GetWordsetDetail({ id: wordsetId! });
            return getDataFromApiRes(res);
        },
        initialData: null,
        enabled: wordsetId !== null,
    });

    return data;
};

export const wordsetIdAtom = atom<number | null>(null);

export const useInitializeWordset = () => {
    const setWordsetId = useSetAtom(wordsetIdAtom);

    const { mutate } = useMutation({
        mutationFn: async (setName: string) => {
            const res = WordsetApi.CreateWordset({ setName });
            return getDataFromApiRes(res);
        },
        mutationKey: ["createWordset"],
        onSuccess: (data) => {
            setWordsetId(data.setId);

            queryClient.invalidateQueries({
                queryKey: ["wordsetList"],
            });
        },
    });

    return (setName: string) => mutate(setName);
};
