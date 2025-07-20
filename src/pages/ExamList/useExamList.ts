import { useQuery } from "@tanstack/react-query";
import GetAllExams from "../../apis/services/exam/get-all-exams";
import { getDataFromApiRes } from "../../apis/services";

const useExamList = () => {
    const { data } = useQuery({
        queryFn: async () => {
            const res = GetAllExams();
            const data = getDataFromApiRes(res);

            return data;
        },
        queryKey: ["exam-list"],
    });

    return data;
};

export default useExamList;
