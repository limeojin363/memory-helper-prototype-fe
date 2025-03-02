import { useMutation } from "@tanstack/react-query";
import { useKorInput } from "./useGeneratingNewWordSetPageData";

const useSubmitCustomKorInput = (pairId: string, korId: string) => {
    const [korInput, setKorInput] = useKorInput(pairId, korId);

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
            setKorInput((draft) => {
                draft!.status = "DETERMINING";
            });
        },
        onSuccess: () => {
            setTimeout(
                () =>
                    setKorInput((draft) => {
                        draft!.status = "SELECTABLE-SELECTED";
                    }),
                1000,
            );
        },
        onError: () => {
            setTimeout(
                () =>
                    setKorInput((draft) => {
                        draft!.status = "NEEDS-CORRECTION";
                    }),
                1000,
            );
        },
    });

    return () => mutate();
};

export default useSubmitCustomKorInput;
