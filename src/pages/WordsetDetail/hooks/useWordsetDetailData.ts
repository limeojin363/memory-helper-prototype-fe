import { useQuery } from "@tanstack/react-query";
import WordsetApi from "../../../apis/services/wordset";
import { getDataFromApiRes } from "../../../apis/services";

export const useWordsetDetailData = (wordsetId: number) => {
  const { data } = useQuery({
    queryFn: () => {
      console.log(1234);
      const res = WordsetApi.GetWordsetDetail({ id: wordsetId });
      return getDataFromApiRes(res);
    },
    staleTime: Infinity,
    queryKey: ["wordsetDetail", wordsetId],
  });

  return data;
};
