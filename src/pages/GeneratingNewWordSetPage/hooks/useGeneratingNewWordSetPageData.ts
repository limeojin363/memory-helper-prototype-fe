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
