import { useMutation } from "@tanstack/react-query";
import { usePair } from "./useGeneratingNewWordSetPageData";

const useSubmitEngInput = (pairId: string) => {
    const [pair, setPair] = usePair(pairId);

    const { mutate } = useMutation({
        mutationFn: async () => {
            const engInput = pair!.engInput.value;
            if (engInput === "") return;

            const res = {
                result: "SUCCESS",
                data: [
                    {
                        id: "1",
                        value: "이것",
                    },
                    {
                        id: "2",
                        value: "저것",
                    },
                ],
            };

            return res;
        },
        onMutate: () => {
            setPair((draft) => {
                draft!.status = "REQUESTED-OPTIONS";
                draft!.engInput.status = "DETERMINING";
            });
        },
        onSuccess: (res) => {
            setTimeout(() => {
                if (!res) return;

                setPair((draft) => {
                    draft!.status = "SELECTING";
                    draft!.korInputs = res.data.map((item) => ({
                        value: item.value,
                        id: item.id,
                        status: "SELECTABLE-UNSELECTED",
                        sourceType: "OFFERED",
                    }));
                    draft!.engInput.status = "OK";
                });
            }, 1000);
        },
        onError: () => {
            setPair((draft) => {
                draft!.status = "REQUEST-FAILED";
            });
        },
    });

    return () => mutate();
};

export default useSubmitEngInput;
