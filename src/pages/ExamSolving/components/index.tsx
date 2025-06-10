import styled from "@emotion/styled";
import Header from "../../../components/layouts/mobile/Header";
import { useRouter } from "@tanstack/react-router";
import useExamDetail from "../../ExamDetail/hooks/useExamDetail";
import ProblemList from "./ProblemList";
import ButtonWithText from "../../../components/button-with-text";

const ExamSolvingPage = ({ examId }: { examId: number }) => {
    const { history } = useRouter();
    const examDetailData = useExamDetail(examId);
    const goBack = () => history.go(-1);

    if (!examDetailData) return null;

    const problemList = examDetailData.problems;
    const examName = examDetailData.examName;

    return (
        <S.Root>
            <Header goBack={goBack}>{examName}</Header>
            <ProblemList listData={problemList} />
            <ButtonWithText
                text="제출하기"
                onClick={() => {
                    console.log("제출하기 클릭됨");
                }}
            />
        </S.Root>
    );
};

const S = {
    Root: styled.div`
        width: 100%;
    `,
};

export default ExamSolvingPage;
