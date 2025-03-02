import { useMutation } from "@tanstack/react-query";
import { useKorInput, usePair } from "./useGeneratingNewWordSetPageData";
import { useEffect } from "react";

const useToggleKorOption = (pairId: string, korInputId: string) => {
    const [korInput, setKorInput] = useKorInput(pairId, korInputId);

    const [pair, setPair] = usePair(pairId);

    const calculatedStatus = (() => {
        if (
            pair!.korInputs!.some(
                (item) => item.status === "SELECTABLE-SELECTED",
            ) &&
            pair!.korInputs!.every((item) => item.status !== "NEEDS-CORRECTION")
        )
            return "USABLE";

        return "SELECTING";
    })();

    useEffect(() => {
        setPair((draft) => {
            draft!.status = calculatedStatus;
        });
        console.log({ calculatedStatus });
    }, [calculatedStatus]);

    const toggleClientState = () =>
        setKorInput((draft) => {
            draft!.status =
                draft!.status === "SELECTABLE-UNSELECTED"
                    ? "SELECTABLE-SELECTED"
                    : "SELECTABLE-UNSELECTED";
        });

    const { mutate: toggleKorOption } = useMutation({
        mutationFn: async () => {
            // 서버에다가 toggle 요청 보내기
            try {
            } catch (error) {}
        },
        onMutate: () => {
            toggleClientState();
        },
        onError: () => {
            // optimistic update rollback
            toggleClientState();
        },
    });

    return { toggleKorOption: () => toggleKorOption() };
};

export default useToggleKorOption;
