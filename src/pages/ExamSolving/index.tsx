import styled from "@emotion/styled";
import { useRouter } from "@tanstack/react-router";
import { createContext, useContext, useState } from "react";
import { GetExamResData } from "@/apis/services/exam/get-exam/index.types";
import useExamDetail from "../ExamDetail/hooks/useExamDetail";
import Text from "@/components/texts/Text";
import Header from "@/components/layouts/mobile/Header";
import ProblemList from "./ProblemList";
import ButtonWithText from "@/components/button-with-text";
import SubmitButton from "./SubmitButton";

const ExamSolvingPageContext = createContext<{
    examId: number; pageData: GetExamResData;
    answers: (number | null)[]; updateAnswer: (pIdx: number, value: number) => void
}>({
    examId: 0,
    pageData: {
        createdAt: new Date(),
        examId: 0,
        examName: "",
        sourceWordSetId: 0,
        sourceWordSetName: "",
        problemResponses: [],
        resultResponses: null,
    },
    answers: [],
    updateAnswer: () => { },
});

const useExamId = () => {
    const { examId } = useContext(ExamSolvingPageContext);

    return examId;
};

const usePageData = () => {
    const { pageData } = useContext(ExamSolvingPageContext);

    return pageData;
};

const useAnswers = (pageData: GetExamResData) => {
    const [answers, setAnswers] =
        useState<(number | null)[]>(pageData.problemResponses.map(() => null));

    const updateAnswer = (pIdx: number, value: number) =>
        setAnswers((prev) => {
            const newAnswers = [...prev];
            if (newAnswers[pIdx] === value)
                newAnswers[pIdx] = null; // Toggle off if already selected
            else
                newAnswers[pIdx] = value; // Set the new value
            return newAnswers;
        });

    return { answers, updateAnswer };
};

const ExamSolvingPage = ({ examId }: { examId: number }) => {
    const pageData = useExamDetail(examId);

    if (!pageData) return null;

    return (
        <PageContent
            examId={examId}
            pageData={pageData}
        />
    );
};

const PageContent = ({ examId, pageData }: { examId: number; pageData: GetExamResData }) => {
    const { answers, updateAnswer } = useAnswers(pageData);
    const { history } = useRouter();
    const goBack = () => history.go(-1);

    return (<ExamSolvingPageContext.Provider value={{ examId, pageData, answers, updateAnswer }}>
        <S.Root>
            <Header goBack={goBack}>
                <Text label={pageData.examName} />
            </Header>
            <S.Inner>
                <ProblemList />
                <SubmitButton />
            </S.Inner>
        </S.Root>
    </ExamSolvingPageContext.Provider>)
}

ExamSolvingPage.useExamId = useExamId;
ExamSolvingPage.usePageData = usePageData;
ExamSolvingPage.useContext = () => useContext(ExamSolvingPageContext);

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
