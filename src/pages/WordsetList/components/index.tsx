import styled from "@emotion/styled";
import { Colors } from "@/designs/colors";
import WordsetsPageItem from "./Item";
import useInfiniteWordsetList from "../hooks/useWordsetListData";
import useCreateAndNavigate from "../hooks/useCreateAndNavigate";
import Icon from "@/components/icons/Icon";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import SearchBar from "@/components/layouts/mobile/SearchBar";
import { debounce } from "lodash";

const WordsetListPage = () => {
  const [search, setSearch] = useState("");
  const { data, fetchNextPage, isFetching, hasNextPage } =
    useInfiniteWordsetList({ name: search });
  const createAndNavigate = useCreateAndNavigate();
  const { ref, inView } = useInView();

  const debouncedFetch = debounce(fetchNextPage, 300);

  useEffect(() => {
    if (inView && !isFetching) debouncedFetch();
  }, [debouncedFetch, inView, isFetching]);

  const pageDescription = isFetching
    ? "불러오는 중"
    : hasNextPage
      ? "스크롤해서 더 불러오세요"
      : "마지막 페이지입니다.";

  return (
    <S.Root>
      <SearchBar onChange={(e) => setSearch(e.target.value)} value={search} />
      <S.MainArea>
        <S.ListContainer>
          <>
            {data?.map(({ createdAt, setId, setName, testSetsCount }) => (
              <WordsetsPageItem
                id={String(setId)}
                key={setId}
                name={setName}
                createdAt={new Date(createdAt)}
                problemSetCount={testSetsCount}
              />
            )) ?? null}
          </>
          <S.PageDescription>{pageDescription}</S.PageDescription>
          {!isFetching && <div ref={ref}></div>}
        </S.ListContainer>
      </S.MainArea>
      <S.AddButton onClick={createAndNavigate}>
        <Icon iconName="plus" size={28} colorName="highlight-lightest" />
      </S.AddButton>
    </S.Root>
  );
};

export default WordsetListPage;

const S = {
  Root: styled.div`
    width: calc(100% - 32px);
    height: 100%;

    display: flex;
    flex-direction: column;
    gap: 16px;
    margin: 12px 0;
  `,
  MainArea: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    /* BottomNavigation 고려하여 보정 */
    padding-bottom: 140px;
  `,
  AddButton: styled.div`
    all: unset;

    cursor: pointer;

    width: 60px;
    height: 60px;
    background-color: ${Colors["highlight-darkest"]};
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    bottom: 128px;
    right: 10%;

    z-index: 100;
  `,
  PageDescription: styled.div`
    text-align: center;
  `,
  ListContainer: styled.div`
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  `,
};
