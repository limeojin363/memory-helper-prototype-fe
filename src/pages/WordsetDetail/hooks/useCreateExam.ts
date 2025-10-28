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
      queryClient.invalidateQueries({
        queryKey: ["wordsetList-infinite"],
      });
       queryClient.invalidateQueries({
        queryKey: ["exam-list-infinite"],
      });

    },
  });

  return mutate;
};

export default useCreateExam;
