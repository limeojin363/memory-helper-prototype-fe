import { atom, useAtom, SetStateAction } from "jotai";
import uuid from "react-uuid";
import { useCallback, useMemo } from "react";
import _ from "lodash";
import { WordInputStatus } from "../../general/inputs/WordInput";

// atom이 지원해야 할 연산
// 1. 새로운 pair item 추가
// 2. pair item 삭제
// 3. pair item의 engValue 변경
// 4. pair item의 korItem 추가
// 5. pair item의 korItem 삭제
// 6. 개별 korItem의 value 변경

type KorItemType = {
    korItemId: string;
    value: string;
    status: WordInputStatus;
};

type WordInputPairItemType = {
    pairId: string;
    engValue: string;
    engStatus: WordInputStatus;
    korItems: "INITIAL" | "LOADING" | KorItemType[];
};

const makeNewPairItem = (): WordInputPairItemType => ({
    pairId: uuid(),
    engStatus: "INITIAL",
    engValue: "",
    korItems: "INITIAL",
});

const makeNewKorItem = (): KorItemType => ({
    korItemId: uuid(),
    value: "",
    status: "INITIAL",
});

const newWordSetAtom = atom<WordInputPairItemType[]>([makeNewPairItem()]);

const getDerivedAtomById = (pairId: string) =>
    atom(
        (get) => {
            const newWordSet = get(newWordSetAtom);
            const pairItem = newWordSet.find((item) => item.pairId === pairId);

            return pairItem!;
        },
        (get, set, setStateAction: SetStateAction<WordInputPairItemType>) => {
            if (typeof setStateAction === "object")
                set(
                    newWordSetAtom,
                    get(newWordSetAtom).map((item) =>
                        item.pairId === pairId ? setStateAction : item,
                    ),
                );
            else if (typeof setStateAction === "function")
                set(
                    newWordSetAtom,
                    get(newWordSetAtom).map((item) =>
                        item.pairId === pairId ? setStateAction(item) : item,
                    ),
                );
        },
    );

// list에 새 pair를 추가하거나 삭제하는 함수 제공
export const usePairList = () => {
    const [pairList, setNewWordSet] = useAtom(newWordSetAtom);

    const addPairItem = () =>
        setNewWordSet((prev) => [...prev, makeNewPairItem()]);

    const deletePairItem = (pairId: string) =>
        setNewWordSet((prev) => prev.filter((item) => item.pairId !== pairId));

    return {
        pairList,
        addPairItem,
        deletePairItem,
    };
};

// 특정 pair item의 eng, korItem에 대한 조작 함수 제공
export const usePairItem = (pairId: string) => {
    const [item, setItem] = useAtom(
        useMemo(() => getDerivedAtomById(pairId), [pairId]),
    );

    const isWaiting = item.korItems === null;

    const fixEng = () => 
        setItem((prev) => ({ ...prev, engStatus: "OK-FIXED" }));

    // engValue setter
    const setEngValue = (engValue: string) =>
        setItem((prev) => ({ ...prev, engValue }));

    // korItems setter
    const setKorItems = (value: WordInputPairItemType["korItems"]) =>
        setItem((prev) => ({ ...prev, korItems: value }));

    // add new korItem
    const addKorItem = () => {
        if (!isWaiting)
            setItem((prev) => ({
                ...prev,
                korItems: [
                    ...(prev.korItems as KorItemType[]),
                    makeNewKorItem(),
                ],
            }));
    };

    // delete single korItem
    const deleteKorItem = (korItemId: string) => {
        if (!isWaiting)
            setItem((prev) => ({
                ...prev,
                korItems: (prev.korItems as KorItemType[]).filter(
                    (korItem) => korItem.korItemId !== korItemId,
                ),
            }));
    };

    // modify single korItem
    const modifySingleKorItem = (korItemId: string, value: string) => {
        if (!isWaiting)
            setItem((prev) => ({
                ...prev,
                korItems: (prev.korItems as KorItemType[]).map((korItem) =>
                    korItem.korItemId === korItemId
                        ? { ...korItem, value }
                        : korItem,
                ),
            }));
    };

    // API call
    const debouncedKorItemsSetter = useCallback(
        _.debounce(() => {
            setKorItems([
                { korItemId: uuid(), value: "사과", status: "OK-FIXED" },
                { korItemId: uuid(), value: "바나나", status: "OK-FIXED" },
            ]);
            fixEng();
        }, 500),
        [],
    );

    const callGetKorAPI = (engValue: string) => {
        setKorItems("LOADING");

        console.log({ engValue });

        debouncedKorItemsSetter();
    };

    return {
        item,
        setEngValue,
        setKorItems,
        addKorItem,
        deleteKorItem,
        modifySingleKorItem,
        callGetKorAPI,
    };
};
