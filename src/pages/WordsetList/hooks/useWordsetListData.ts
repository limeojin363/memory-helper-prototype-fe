import { useInfiniteQuery } from "@tanstack/react-query";
import WordsetApi from "../../../apis/services/wordset";
import { getDataFromApiRes } from "../../../apis/services";

const useInfiniteWordsetList = (
  {
    name,
  }: {
    name?: string;
  } = { name: "" },
) => {
  const { fetchNextPage, data, isFetching, hasNextPage } = useInfiniteQuery({
    queryFn: async ({ pageParam }) => {
      const res = WordsetApi.GetWordsetList({
        name,
        page: pageParam,
        size: 10,
      });
      const data = await getDataFromApiRes(res);
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.last) return undefined;
      return allPages.length;
    },
    queryKey: ["wordsetList-infinite", name],
    staleTime: Infinity,
  });

  return {
    data: data?.pages.map((page) => page.content).flat(),
    fetchNextPage,
    isFetching,
    hasNextPage,
  };
};

export default useInfiniteWordsetList;
