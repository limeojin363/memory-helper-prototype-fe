import { getDataFromApiRes } from "@/apis/services";
import GetResult from "@/apis/services/result";
import { useQuery } from "@tanstack/react-query";


const useResultDetail = (resultId: number) => {
    const { data } = useQuery({
        queryFn: async () => {
            console.log("resultDetail", resultId);
            const res = GetResult({ resultId });
            const data = await getDataFromApiRes(res);

            return data;
        },
        queryKey: ["resultDetail", resultId],
        initialData: null,
    });

    return data;
};

export default useResultDetail;
