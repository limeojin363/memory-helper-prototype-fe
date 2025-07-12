import { useMutation } from "@tanstack/react-query";
import CreateExam from "../../../apis/services/exam/create-exam";
import { queryClient } from "../../../routes/__root";

const useCreateExam = (wordsetId: number) => {
    const { mutate } = useMutation({
        mutationFn: async () => {
            try {
                await CreateExam({ setId: wordsetId });
            } catch (error) {
                console.error("Error creating exam:", error);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["wordsetDetail", wordsetId],
            });
        },
    });

    return mutate;
};

export default useCreateExam;
