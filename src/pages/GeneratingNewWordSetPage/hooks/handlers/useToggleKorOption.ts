import { useMutation } from "@tanstack/react-query";
import { useKorInput } from "../states/useKorInput";

const useToggleKorOption = (korInputId: string) => {
    const { setKorInput } = useKorInput(korInputId);

    const toggleClientState = () =>
        setKorInput((prev) => ({
            ...prev,
            status:
                prev.status === "SELECTABLE-UNSELECTED"
                    ? "SELECTABLE-SELECTED"
                    : "SELECTABLE-UNSELECTED",
        }));

    const { mutate: toggleKorOption } = useMutation({
        mutationFn: async () => {
            // TODO: 서버에다가 toggle 요청 보내기
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
