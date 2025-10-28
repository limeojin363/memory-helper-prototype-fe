import { useQuery } from "@tanstack/react-query";
import GetExam from "../../../apis/services/exam/get-exam";
import { getDataFromApiRes } from "../../../apis/services";

export type ProblemType = {
  question: string;
  problemId: number;
  problemNumber: number;
  multipleChoice: {
    id: string;
    value: string;
  }[];
};

const useExamDetail = (examId: number) => {
  const { data } = useQuery({
    queryFn: async () => {
      const res = GetExam({ examId });
      const data = await getDataFromApiRes(res);

      return data;
    },
    queryKey: ["examDetail", examId],
    staleTime: Infinity,
  });

  return data;
};

export default useExamDetail;
