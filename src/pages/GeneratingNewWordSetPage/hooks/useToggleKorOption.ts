import { useMutation } from "@tanstack/react-query";
import { usePair } from "./useGeneratingNewWordSetPageData";

const useToggleKorOption = (pairId: string, korInputId: string) => {
    const [pair, setPair] = usePair(pairId);

    const { mutate: toggleKorOption } = useMutation({
        mutationFn: async () => {
            // 서버에다가 toggle 요청 보내기
            try {
            } catch (error) {}
        },
        onMutate: () => {
            // optimistic update
            const nextKorInputs = pair!.korInputs!.map((item) => {
                if (item.id === korInputId) {
                    item.status =
                        item.status === "SELECTABLE-UNSELECTED"
                            ? "SELECTABLE-SELECTED"
                            : "SELECTABLE-UNSELECTED";
                }
                return item;
            });

            setPair((draft) => {
                draft!.korInputs = nextKorInputs;
            });

            return { nextKorInputs };
        },
        onError: (_, __, context) => {
            // optimistic update rollback
            if (context === undefined) return;

            const rollbackedKorInputs = context.nextKorInputs.map((item) => {
                if (item.id === korInputId) {
                    item.status =
                        item.status === "SELECTABLE-UNSELECTED"
                            ? "SELECTABLE-SELECTED"
                            : "SELECTABLE-UNSELECTED";
                }
                return item;
            });

            setPair((draft) => {
                draft!.status = "REQUEST-FAILED";
                draft!.korInputs = rollbackedKorInputs;
            });
        },
    });

    return { toggleKorOption };
};

export default useToggleKorOption;
