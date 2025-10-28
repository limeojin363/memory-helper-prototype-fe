import { useEffect, useState } from "react";
import ExamListComponent from "./ExamListComponent";
import useExamList from "./useExamList";
import styled from "@emotion/styled";
import { useInView } from "react-intersection-observer";
import SearchBar from "@/components/layouts/mobile/SearchBar";
import { debounce } from "lodash";

const ExamListPage = () => {
  const [search, setSearch] = useState("");
  const { data, fetchNextPage, isFetching, hasNextPage } = useExamList({ name: search });
  const debouncedFetch = debounce(fetchNextPage, 300);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetching) {
      debouncedFetch();
    }
  }, [debouncedFetch, inView, isFetching]);

  return (
    <S.MiddleArea>
      <SearchBar onChange={(e) => setSearch(e.target.value)} value={search} />
      <ExamListComponent
        hasNextPage={hasNextPage}
        ref={ref}
        data={data}
        isFetching={isFetching}
      />
    </S.MiddleArea>
  );
};

export default ExamListPage;

const S = {
  MiddleArea: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    width: calc(100% - 32px);
    margin: 20px 16px 0;
  `,
};
