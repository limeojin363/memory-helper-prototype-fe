import { useMutation } from "@tanstack/react-query";
import { usePair } from "./useGeneratingNewWordSetPageData";

const useRequestKorOptions = (pairId: string) => {
    const [, setPair] = usePair(pairId);

    const { mutate } = useMutation({
        mutationFn: async () => {
            try {
            } catch (error) {}
        },
        onMutate: () => {
            setPair((draft) => {
                draft!.status = "REQUESTED-OPTIONS";
            });
        },
        onSettled: () => {
            setTimeout(() => {
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
                setPair((draft) => {
                    draft!.status = "SELECTING";
                    draft!.korInputs = res.data.map((item) => ({
                        value: item.value,
                        id: item.id,
                        status: "SELECTABLE-UNSELECTED",
                        sourceType: "OFFERED",
                    }));
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

export default useRequestKorOptions;
