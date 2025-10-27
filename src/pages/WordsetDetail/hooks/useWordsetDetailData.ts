import { useQuery } from "@tanstack/react-query";
import WordsetApi from "../../../apis/services/wordset";
import { getDataFromApiRes } from "../../../apis/services";

export const useWordsetDetailData = (wordsetId: number) => {
  const { data } = useQuery({
    queryKey: ["wordsetDetail", wordsetId],
    queryFn: () => {
      const res = WordsetApi.GetWordsetDetail({ id: wordsetId });
      return getDataFromApiRes(res);
    },
    initialData: null,
  });

  return data;
};
