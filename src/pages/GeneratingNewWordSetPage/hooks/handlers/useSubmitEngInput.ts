import { getDefaultStore } from "jotai";
import { useMutation } from "@tanstack/react-query";
import { korInputAtomFamily } from "../states/atoms";
import { usePair } from "../states/usePair";
import uuid from "react-uuid";
import HTTPWordRequest from "../../../../apis/services/word";
import { WordConverter } from "../../../WordSetDetailPage/hooks/useWordSetDetailData";

const useSubmitEngInput = (pairId: string) => {
    const { pair, setPair } = usePair(pairId);

    const { mutate } = useMutation({
        mutationFn: async () => {
            const engValue = pair.engValue;
            if (engValue === "") return;

            const { data } = await (
                await HTTPWordRequest.PostWordExists(pair.engValue)
            ).json();

            return data;
        },
        onMutate: () => {
            setPair((prev) => ({ ...prev, engStatus: "WAITING" }));
        },
        onSuccess: (res) => {
            if (!res) return;

            const converted = new WordConverter.ServerToClient(res).clientData;
            converted.korWords.forEach(({ word, type }) => {
                const id = uuid();
                getDefaultStore().set(korInputAtomFamily(id), {
                    id,
                    value: word,
                    sourceType: "OFFERED",
                    status: "SELECTABLE-UNSELECTED",
                    type,
                });

                setPair((prev) => ({
                    ...prev,
                    engStatus: "OK",
                    korIds: [...prev.korIds, id],
                }));
            });
        },
        onError: () => {
            setPair((prev) => ({
                ...prev,
                engStatus: "NEEDS-CORRECTION",
            }));
        },
    });

    return () => mutate();
};

export default useSubmitEngInput;
