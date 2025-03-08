import { useMutation } from "@tanstack/react-query";
import { useKorInput } from "../states/useKorInput";

const useSubmitCustomKorInput = (korId: string) => {
    const { korInput, setKorInput } = useKorInput(korId);

    const { mutate } = useMutation({
        mutationFn: async () => {
            const body = korInput;
            try {
                return true;
            } catch (error) {
                return false;
            }
        },
        onMutate: () => {
            setKorInput((prev) => ({ ...prev, status: "WAITING" }));
        },
        onSuccess: () => {
            setTimeout(() =>
                setKorInput((prev) => ({
                    ...prev,
                    status: "SELECTABLE-SELECTED",
                })),
            );
        },
        onError: () => {
            setTimeout(
                () =>
                    setKorInput((prev) => ({
                        ...prev,
                        status: "NEEDS-CORRECTION",
                    })),
                1000,
            );
        },
    });

    return () => mutate();
};

export default useSubmitCustomKorInput;
