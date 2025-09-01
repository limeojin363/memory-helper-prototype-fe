import { useQuery } from "@tanstack/react-query";
import { getDataFromApiRes } from "../../apis/services";
import GetExams from "@/apis/services/exam/get-exam-list";

const useExamList = () => {
    const { data } = useQuery({
        queryFn: async () => {
            const res = GetExams({ page: 0, size: 5 });
            const data = getDataFromApiRes(res);

            return data;
        },
        queryKey: ["exam-list"],
    });

    return data;
};

export default useExamList;
