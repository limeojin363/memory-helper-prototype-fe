import styled from "@emotion/styled";
import Header from "../../components/layouts/mobile/Header";
import { useRouter } from "@tanstack/react-router";
import useExamDetail from "../ExamDetail/hooks/useExamDetail";
import ProblemList from "./ProblemList";
import ButtonWithText from "../../components/button-with-text";
import { createContext, useContext } from "react";
import Text from "../../components/texts/Text";

const ExamSolvingPageContext = createContext<{ examId: number }>({
    examId: 0,
});

export const useExamId = () => {
    const { examId } = useContext(ExamSolvingPageContext);

    return examId;
};

const ExamSolvingPage = ({ examId }: { examId: number }) => {
    const { history } = useRouter();
    const examDetailData = useExamDetail(examId);
    const goBack = () => history.go(-1);

    if (!examDetailData) return null;

    const problemList = examDetailData.problemResultList;
    const examName = examDetailData.examName;

    return (
        <ExamSolvingPageContext.Provider value={{ examId }}>
            <S.Root>
                <Header goBack={goBack}>
                    <Text label={examName} />
                </Header>
                <S.Inner>
                    <ProblemList listData={problemList} />
                    <ButtonWithText
                        text="제출하기"
                        onClick={() => {
                            console.log("제출하기 클릭됨");
                        }}
                    />
                </S.Inner>
            </S.Root>
        </ExamSolvingPageContext.Provider>
    );
};

const S = {
    Root: styled.div`
        width: 100%;
    `,
    Inner: styled.div`
        padding: 20px;

        display: flex;
        flex-direction: column;
        gap: 40px;
    `,
};

export default ExamSolvingPage;
