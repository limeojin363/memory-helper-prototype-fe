import { getDefaultStore, useAtom } from "jotai";
import uuid from "react-uuid";
import { korInputAtomFamily, pairAtomFamily, pairIdListAtom } from "./atoms";
import { useEffect } from "react";
import HTTPWordRequest from "../../../../apis/services/word";

export const usePageState = () => {
    const [pairIdList, setPairIdList] = useAtom(pairIdListAtom);

    useEffect(() => {
        HTTPWordRequest.PostWordExists("word")
            .then((response) => response.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => console.log("Success:", response))
    }, []);

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
