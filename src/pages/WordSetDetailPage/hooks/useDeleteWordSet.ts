import { useMutation } from "@tanstack/react-query";
import DeleteWordSetRequest from "../../../apis/services/word-set/deleteWordSet";

const useDeleteWordSet = (setId: number) => {
   const {mutate: handler}=  useMutation({
        mutationFn: async () => {
            await DeleteWordSetRequest(setId);
        },
        onSuccess: () => {
            window.location.href = "/words";
        },
    });

    return ()=>handler();
};

export default useDeleteWordSet;
