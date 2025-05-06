import addGptWordToSet from "../../../../apis/services/word-set/addGptWord";
import {
    getPairDataForServerAtom,
    newWordSetIdAtom,
    pairIdListAtom,
} from "../states/atoms";
import { getDefaultStore, useAtomValue } from "jotai";

const useFinishGeneratingStep = () => {
    const pairIdList = useAtomValue(pairIdListAtom);
    const setId = useAtomValue(newWordSetIdAtom);

   return () => pairIdList.forEach(async (id) => {
        try {
            const {wordId, ...a } = getDefaultStore().get(getPairDataForServerAtom(id));

          console.log(a);

            addGptWordToSet(Number(setId), a);
        } catch (error) {
            console.error("Error adding GPT word to set:", error);
        }
    });
};

export default useFinishGeneratingStep;
