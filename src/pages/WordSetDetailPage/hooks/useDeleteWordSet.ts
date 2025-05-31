import { useMutation } from "@tanstack/react-query";
import WordsetApi from "../../../apis/services/wordset";

const useDeleteWordSet = (setId: number) => {
    const { mutate: handler } = useMutation({
        mutationFn: async () => {
            WordsetApi.DeleteWordset({ id: setId });
        },
        onSuccess: () => {
            window.location.href = "/words";
        },
    });

    return () => handler();
};

export default useDeleteWordSet;
