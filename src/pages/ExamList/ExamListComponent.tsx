import { GetExamsResData } from "@/apis/services/exam/get-exam-list/index.types";
import ExamItem from "./ExamItem";
import styled from "@emotion/styled";

const ExamListComponent = ({
  data,
  ref,
  isFetching,
  hasNextPage,
}: {
  data?: GetExamsResData["content"];
  ref: (node?: Element | null) => void;
  isFetching: boolean;
  hasNextPage: boolean;
}) => {
  const pageDescription = isFetching
    ? "불러오는 중"
    : hasNextPage
      ? "스크롤해서 더 불러오세요"
      : "마지막 페이지입니다.";

  return (
    <S.Root>
      {data?.map((exam) => (
        <ExamItem
          id={String(exam.examId)}
          key={exam.examId}
          name={exam.examName}
          generatedAt={new Date(exam.generatedAt)}
          basedOn={"exam.basedWordsetName"}
          howManyTimesStudied={exam.timesStudied}
          recentStudiedAt={new Date(exam.recentStudiedAt ?? Date.now())}
          problemNumber={exam.problemCount}
        />
      ))}
      <S.PageDescription>{pageDescription}</S.PageDescription>
      {!isFetching && <div ref={ref}></div>}
    </S.Root>
  );
};

const S = {
  Root: styled.div`
    position: relative;

    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-bottom: 140px;
  `,
  PageDescription: styled.div`
    text-align: center;
  `,
};

export default ExamListComponent;
