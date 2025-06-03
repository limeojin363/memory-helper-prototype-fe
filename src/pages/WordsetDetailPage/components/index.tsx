import styled from "@emotion/styled";
import WordList, { WordItemProps } from "./ListView/List";
import WordDetailModal from "./WordDetailModal";
import { useWordsetDetailData } from "../hooks/useWordsetDetailData";
import { Provider } from "jotai";
import WordsetName from "./WordsetName";
import Header from "../../../components/layouts/mobile/Header";
import { useNavigate } from "@tanstack/react-router";
import { TypeKey } from "../../../components/type-selector/TypeSelector";

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

// TODO: wordsetId를 props에서 빼버릴 수는 없는가 고민
const WordsetDetailPage = ({ wordsetId }: { wordsetId: number }) => {
    const detailData = useWordsetDetailData(wordsetId);

    const navigate = useNavigate();

    const goBack = () =>
        navigate({
            to: "/words",
        });

    if (!detailData) return null;

    const setName = detailData.name;
    const processedList = detailData.list.map(listProcessCallback);

    return (
        // Provider for Modal Status
        <Provider>
            <S.Outer>
                <Header goBack={goBack}>
                    <WordsetName propValue={setName} wordsetId={wordsetId} />
                </Header>
                <WordList listData={processedList} />
                <WordDetailModal
                    listData={detailData.list}
                    wordsetId={wordsetId}
                />
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
};
