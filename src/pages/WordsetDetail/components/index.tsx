import styled from "@emotion/styled";
import WordsArea from "./WordsArea";
import { useWordsetDetailData } from "../hooks/useWordsetDetailData";
import { Provider } from "jotai";
import WordsetName from "./WordsetName";
import Header from "../../../components/layouts/mobile/Header";
import { useNavigate } from "@tanstack/react-router";
import { GetWordsetDetailData } from "../../../apis/services/wordset/get-wordset-detail/index.types";
import { useState } from "react";
import Button1 from "../../../components/button1";
import ExamsArea from "./ExamsArea";
import Text from "../../../components/texts/Text";

const ModeSelector = ({
    mode,
    setMode,
}: {
    mode: "WORDS" | "EXAMS";
    setMode: (mode: "WORDS" | "EXAMS") => void;
}) => {
    return (
        <S.Wrapper>
            <Button1
                height={"50px"}
                colorStyle={mode === "WORDS" ? "NeutralSelected" : "Neutral"}
                onClick={() => setMode("WORDS")}
            >
                <Text
                    fontStyle={mode === "WORDS" ? "action-xl" : "action-xl"}
                    fontSize={mode === "WORDS" ? 18 : 17}
                    label="단어장"
                    colorName={"neutral-dark-darkest"}
                />
            </Button1>
            <Button1
                height={"50px"}
                colorStyle={mode === "EXAMS" ? "NeutralSelected" : "Neutral"}
                onClick={() => setMode("EXAMS")}
            >
                <Text
                    fontStyle={mode === "EXAMS" ? "action-xl" : "action-xl"}
                    fontSize={mode === "EXAMS" ? 18 : 17}
                    label="시험"
                    colorName={"neutral-dark-darkest"}
                />
            </Button1>
        </S.Wrapper>
    );
};

// ROOT
const WordsetDetailPage = ({ wordsetId }: { wordsetId: number }) => {
    const pageData = useWordsetDetailData(wordsetId);

    if (!pageData) return null;

    return <Content pageData={pageData} wordsetId={wordsetId} />;
};

const Content = ({
    wordsetId,
    pageData,
}: {
    wordsetId: number;
    pageData: GetWordsetDetailData;
}) => {
    const navigate = useNavigate();
    const [pageMode, setPageMode] = useState<"WORDS" | "EXAMS">("WORDS");

    const goBack = () =>
        navigate({
            to: "/wordset",
        });

    const setName = pageData.name;
    const examIds = pageData.examIds;

    return (
        // Provider for Modal Status
        <Provider>
            <S.Outer>
                <Header goBack={goBack}>
                    <WordsetName valueFromProps={setName} wordsetId={wordsetId} />
                </Header>
                <ModeSelector mode={pageMode} setMode={setPageMode} />
                {pageMode === "WORDS" ? (
                    <WordsArea listData={pageData.list} wordsetId={wordsetId} />
                ) : (
                    <ExamsArea examIds={examIds} wordsetId={wordsetId} />
                )}
            </S.Outer>
        </Provider>
    );
};

export default WordsetDetailPage;

const S = {
    Outer: styled.div`
        height: 100vh;
        width: 100vw;

        display: flex;
        flex-direction: column;
        align-items: center;
    `,
    Wrapper: styled.div`
        display: flex;
        width: calc(100% - 60px);
        justify-content: center;
        margin-bottom: 8px;
        gap: 8px;
    `,
};
