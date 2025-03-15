import { atom, PrimitiveAtom } from "jotai";
import { InputPair, KorItem, PairStatus } from "../../types";
import { atomFamily } from "jotai/utils";
import deepEqual from "fast-deep-equal";

const makeNewPairItem = (id: string): InputPair => ({
    id,
    engValue: "",
    engStatus: "INITIAL",
    korIds: [],
});

const makeNewCustomKorItem = (id: string): KorItem => ({
    id,
    value: "",
    sourceType: "CUSTOM",
    status: "INITIAL",
    type: null,
});

// pairId 리스트
export const pairIdListAtom = atom<string[]>([]);

// pairId에 해당하는 pairAtom
export const pairAtomFamily = atomFamily<string, PrimitiveAtom<InputPair>>(
    (pairId) => atom(makeNewPairItem(pairId)),
    deepEqual,
);

// korId에 해당하는 korInputAtom
export const korInputAtomFamily = atomFamily<string, PrimitiveAtom<KorItem>>(
    (korId) => atom(makeNewCustomKorItem(korId)),
    deepEqual,
);

// pair의 status를 반환하는 read-only atom
export const getPairStatusAtom = (pairId: string) => {
    return atom<PairStatus>((get) => {
        const pair = get(pairAtomFamily(pairId));
        switch (pair.engStatus) {
            case "INITIAL":
                return "INITIAL";
            case "WAITING":
                return "WAITING";
            case "NEEDS-CORRECTION":
                return "ENG-ERROR";
            case "OK":
                if (
                    pair.korIds.some(
                        (korId) =>
                            get(korInputAtomFamily(korId)).status ===
                            "SELECTABLE-SELECTED",
                    )
                )
                    return "USABLE";

                return "SELECTING-KOR";
        }
    });
};
