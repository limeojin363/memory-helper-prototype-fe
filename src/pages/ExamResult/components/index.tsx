import styled from "@emotion/styled";

type ExamResultPageProps = { resultId: number };

const ExamResultPage = ({ resultId }: ExamResultPageProps) => {
    return <S.Root>{resultId}</S.Root>;
};

const S = {
    Root: styled.div`
        /* FILL HERE */
    `,
};

export default ExamResultPage;
