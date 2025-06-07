import { useMutation } from "@tanstack/react-query";
import WordsetApi from "../../../apis/services/wordset";
import { useNavigate } from "@tanstack/react-router";
import { queryClient } from "../../../routes/__root";

const useDeleteWordsetAndNavigate = (setId: number) => {
    const navigate = useNavigate();

    const { mutate: handler } = useMutation({
        mutationFn: async () => {
           await WordsetApi.DeleteWordset({ id: setId });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["wordsetList"],
            });
            navigate({ to: "/words" });
        },
    });

    return () => handler();
};

export default useDeleteWordsetAndNavigate;
