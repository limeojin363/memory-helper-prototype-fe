import { useEffect } from "react";
import ExamListComponent from "./ExamListComponent";
import useExamList from "./useExamList";
import styled from "@emotion/styled";
import { useInView } from "react-intersection-observer";

const ExamListPage = () => {
  const { data, fetchNextPage, isFetching, hasNextPage } = useExamList();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetching) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, isFetching]);

  return (
    <S.MiddleArea>
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
