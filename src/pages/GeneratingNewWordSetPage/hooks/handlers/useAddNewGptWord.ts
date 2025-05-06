import { useAtomValue } from "jotai";
import addGptWordToSet from "../../../../apis/services/word-set/addGptWord";
import { newWordSetIdAtom, getPairDataForServerAtom } from "../states/atoms";
import { useMutation } from "@tanstack/react-query";

const useAddNewGptWord = (pairId: string) => {
    const setId = useAtomValue(newWordSetIdAtom);
    const pairDataForServer = useAtomValue(getPairDataForServerAtom(pairId));

    const { mutate } = useMutation({
        mutationFn: async () => {
            await (
                await addGptWordToSet(Number(setId), pairDataForServer)
            ).json();
        },
    });

        return { mutate };
};

export default useAddNewGptWord;
