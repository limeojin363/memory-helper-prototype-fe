import styled from "@emotion/styled";
import WordsArea, { WordItemProps } from "./WordsArea";
import WordDetailModal from "./WordsModal/WordsModalBody";
import { useWordsetDetailData } from "../hooks/useWordsetDetailData";
import { Provider } from "jotai";
import WordsetName from "./WordsetName";
import Header from "../../../components/layouts/mobile/Header";
import { useNavigate } from "@tanstack/react-router";
import { TypeKey } from "../../../components/type-selector/TypeSelector";
import { GetWordsetDetailData } from "../../../apis/services/wordset/get-wordset-detail/index.types";
import { useState } from "react";
import Button1 from "../../../components/button1";
import ExamsArea from "./ExamsArea";
import Text from "../../../components/texts/Text";

// 모델 변환자
const listProcessCallback = (item: {
    wordId: number;
    word: string;
    meaning: Array<{
        type: TypeKey;
        value: string;
    }>;
}): WordItemProps & { key: number } => ({
    eng: item.word,
    firstMeaning: item.meaning[0].value,
    meaningCount: item.meaning.length,
    key: item.wordId,
    id: item.wordId,
});

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

const WordsetDetailPage = ({ wordsetId }: { wordsetId: number }) => {
    const detailData = useWordsetDetailData(wordsetId);

    if (!detailData) return null;

    return <Content detailData={detailData} wordsetId={wordsetId} />;
};

const Content = ({
    wordsetId,
    detailData,
}: {
    wordsetId: number;
    detailData: GetWordsetDetailData;
}) => {
    const navigate = useNavigate();
    const [mode, setMode] = useState<"WORDS" | "EXAMS">("WORDS");

    const goBack = () =>
        navigate({
            to: "/wordset",
        });

    const setName = detailData.name;
    const processedList = detailData.list.map(listProcessCallback);
    const examIds = detailData.examIds;

    return (
        // Provider for Modal Status
        <Provider>
            <S.Outer>
                <Header goBack={goBack}>
                    <WordsetName propValue={setName} wordsetId={wordsetId} />
                </Header>
                <ModeSelector mode={mode} setMode={setMode} />
                {mode === "WORDS" ? (
                    <>
                        <WordsArea
                            listData={processedList}
                            wordsetId={wordsetId}
                        />
                        <WordDetailModal
                            listData={detailData.list}
                            wordsetId={wordsetId}
                        />
                    </>
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
