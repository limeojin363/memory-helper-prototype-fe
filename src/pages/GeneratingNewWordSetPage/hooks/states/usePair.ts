import { useAtom } from "jotai";
import { korInputAtomFamily, pairAtomFamily } from "./atoms";
import uuid from "react-uuid";

export const usePair = (pairId: string) => {
    const [pair, setPair] = useAtom(
        pairAtomFamily(pairId)
    );

    const addNewKor = () =>
        setPair((prev) => ({ ...prev, korIds: [...prev.korIds, uuid()] }));

    const deleteKor = (korId: string) => {
        korInputAtomFamily.remove(korId);

        setPair((prev) => ({
            ...prev,
            korIds: prev.korIds.filter((item) => item !== korId),
        }));
    };

    return { pair, setPair, addNewKor, deleteKor };
};

