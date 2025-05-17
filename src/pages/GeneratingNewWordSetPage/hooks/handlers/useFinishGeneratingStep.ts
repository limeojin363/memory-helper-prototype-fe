import WordsetApi from "../../../../apis/services/wordset";
import {
    getPairDataForServerAtom,
    newWordSetIdAtom,
    pairIdListAtom,
} from "../states/atoms";
import { getDefaultStore, useAtomValue } from "jotai";

const useFinishGeneratingStep = () => {
    const pairIdList = useAtomValue(pairIdListAtom);
    const setId = useAtomValue(newWordSetIdAtom);

    return () =>
        pairIdList.forEach(async (id) => {
            try {
                const { wordId: _, ...a } = getDefaultStore().get(
                    getPairDataForServerAtom(id),
                );

                console.log(a);

                const paramObj = {
                    wordSetId: setId,
                    word: a.word,
                    meaning: a.meaning,}

                WordsetApi.AddWordToWordset(paramObj);
            } catch (error) {
                console.error("Error adding GPT word to set:", error);
            }
        });
};

export default useFinishGeneratingStep;
