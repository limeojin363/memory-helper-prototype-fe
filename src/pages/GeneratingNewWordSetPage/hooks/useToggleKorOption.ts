import { useMutation } from "@tanstack/react-query";
import { useKorInput } from "./useGeneratingNewWordSetPageData";

const useToggleKorOption = (pairId: string, korInputId: string) => {
    const [korInput, setKorInput] = useKorInput(pairId, korInputId);

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
