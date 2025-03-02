import uuid from "react-uuid";
import _ from "lodash";
import { useMemo } from "react";
import { atom, useAtom } from "jotai";
import { withImmer } from "jotai-immer";
import { focusAtom } from "jotai-optics";
import { InputPairObject, KorInputObject } from "../types";

export const makeNewPairItem = (): InputPairObject => ({
    id: uuid(),
    status: "INITIAL",
    engInput: {
        value: "",
        status: "INITIAL",
    },
    korInputs: null,
});

export const makeNewCustomKorItem = (): KorInputObject => ({
    id: uuid(),
    value: "",
    sourceType: "CUSTOM",
    status: "INITIAL",
});

const rootAtom = withImmer(atom([makeNewPairItem()]));

export const useGenerateNewWordSetPageData = () => useAtom(rootAtom);

// "INITIAL" | "REQUESTED-OPTIONS" | "REQUEST-FAILED" | "SELECTING" | "USABLE"

export const useUpdatePairStatus = (pairId: string) => {
    const [pair, setPair] = usePair(pairId);

    const updatePairStatus = () =>
        setPair((draft) => {
            draft!.status = (() => {
                if (pair!.engInput.status === "OK") {
                    if (
                        pair!.korInputs!.some(
                            (item) => item.status === "SELECTABLE-SELECTED",
                        ) &&
                        pair!.korInputs!.every(
                            (item) => item.status !== "NEEDS-CORRECTION",
                        )
                    )
                        return "USABLE";

                    return "SELECTING";
                }
                // 호출되면 안됨..
                return "INITIAL";
            })();
        });

    return updatePairStatus;
};

export const usePair = (pairId: string) =>
    useAtom(
        useMemo(
            () =>
                withImmer(
                    focusAtom(rootAtom, (optic) =>
                        optic.find((pairItem) => pairItem.id === pairId),
                    ),
                ),
            [pairId],
        ),
    );

export const useKorInput = (pairId: string, korId: string) =>
    useAtom(
        useMemo(
            () =>
                withImmer(
                    focusAtom(rootAtom, (optic) =>
                        optic
                            .find((pairItem) => pairItem.id === pairId)
                            .prop("korInputs")
                            .guard((i) => i !== null)
                            .find((korItem) => korItem.id === korId),
                    ),
                ),
            [pairId, korId],
        ),
    );
