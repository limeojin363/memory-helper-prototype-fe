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
    const { fetchNextPage, data, isFetchingNextPage } = useInfiniteQuery({
        queryFn: async ({ pageParam }) => {
            const res = WordsetApi.GetWordsetList({
                name,
                page: pageParam,
                size: 15,
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
    });

    return {
        data: data?.pages.map((page) => page.content).flat(),
        fetchNextPage,
        isFetchingNextPage,
    };
};

export default useInfiniteWordsetList;
