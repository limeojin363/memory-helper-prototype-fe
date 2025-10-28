import { useInfiniteQuery } from "@tanstack/react-query";
import { getDataFromApiRes } from "../../apis/services";
import GetExams from "@/apis/services/exam/get-exam-list";

const useExamList = (
  {
    name,
  }: {
    name?: string;
  } = { name: "" },
) => {
  const { fetchNextPage, data, isFetching, hasNextPage } = useInfiniteQuery({
    queryFn: async ({ pageParam }) => {
      const res = GetExams({ page: pageParam, size: 10, name });
      const data = getDataFromApiRes(res);

      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.last) return undefined;
      return allPages.length;
    },
    queryKey: ["exam-list-infinite", name],
    staleTime: Infinity,
  });

  return {
    data: data?.pages.map((page) => page.content).flat(),
    fetchNextPage,
    isFetching,
    hasNextPage,
  };
};

export default useExamList;
