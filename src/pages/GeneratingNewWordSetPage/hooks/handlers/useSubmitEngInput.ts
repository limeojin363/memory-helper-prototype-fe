import { getDefaultStore, useAtom } from "jotai";
import { useMutation } from "@tanstack/react-query";
import { korInputAtomFamily } from "../states/atoms";
import { usePair } from "../states/usePair";
import uuid from "react-uuid";

const useSubmitEngInput = (pairId: string) => {
    const { pair, setPair } = usePair(pairId);

    const { mutate } = useMutation({
        mutationFn: async () => {
            const engValue = pair.engValue;
            if (engValue === "") return;

            const res = {
                result: "SUCCESS",
                data: [
                    {
                        id: uuid(),
                        value: uuid(),
                    },
                    {
                        id: uuid(),
                        value: uuid(),
                    },
                ],
            };

            return res;
        },
        onMutate: () => {
            setPair((prev) => ({ ...prev, engStatus: "WAITING" }));
        },
        onSuccess: (res) => {
            setTimeout(() => {
                if (!res) return;

                res.data.forEach(({ id, value }) => {
                    getDefaultStore().set(korInputAtomFamily(id), {
                        id,
                        value,
                        sourceType: "OFFERED",
                        status: "SELECTABLE-UNSELECTED",
                    });
                });

            setPair((prev) => ({ ...prev, engStatus: "OK" }));

            setPair((prev) => ({
                    ...prev,
                    korIds: res.data.map((item) => item.id),
                }));
            }, 1000);
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
