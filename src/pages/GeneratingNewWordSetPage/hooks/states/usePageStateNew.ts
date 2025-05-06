import { getDefaultStore, useAtom } from "jotai";
import uuid from "react-uuid";
import { korInputAtomFamily, pairAtomFamily, pairIdListAtom } from "./atoms";

export const usePageState = () => {
    const [pairIdList, setPairIdList] = useAtom(pairIdListAtom);

    const addNewPair = () => setPairIdList((prev) => [...prev, uuid()]);

    // TODO: 서버에서도 단어장에 등록되어 있는 단어라면, 삭제 API 호출 필요
    const deletePair = (pairId: string) => {
        const pairAtom = pairAtomFamily(pairId);
        const { korIds } = getDefaultStore().get(pairAtom);

        korIds.forEach((korId) => {
            korInputAtomFamily.remove(korId);
        });

        pairAtomFamily.remove(pairId);
        setPairIdList((prev) => prev.filter((item) => item !== pairId));
    };

    return { pairIdList, addNewPair, deletePair };
};
