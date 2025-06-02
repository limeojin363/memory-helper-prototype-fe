import styled from "@emotion/styled";
import WordList, { WordItemProps } from "./ListView/List";
import { useRef } from "react";
import DetailViewModal from "./ModalView/Modal";
import {
    useInitializeWordset,
    useWordsetDetailData,
} from "../hooks/useServerData";
import { TypeKey } from "../../WordSetDetailPage/components/WordSetList";
import { Provider } from "jotai";
import useWordSetListData from "../../WordSetListPage/hooks/useWordSetListData";
import WordsetName from "./WordsetName";
import { Colors } from "../../../designs/colors";

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

const CreateAutomatically = () => {
    const isFiredRef = useRef(false);
    const initialize = useInitializeWordset();
    const listData = useWordSetListData();

    if (!listData) return <div>ERROR</div>;

    if (!isFiredRef.current) {
        isFiredRef.current = true;
        const maxNumber = listData.reduce<number>((max, wordset) => {
            const num = Number(wordset.setName.replace("wordset", ""));
            return Number.isNaN(num) ? max : Math.max(max, num);
        }, 0);
        initialize(`wordset${maxNumber + 1}`);
    }

    return null;
};

const Content = () => {
    const detailData = useWordsetDetailData();

    if (!detailData) return <CreateAutomatically />;

    const setName = detailData.name;
    const processedList = detailData.list.map(listProcessCallback);

    return (
        // modalStatusAtom은 Provider 내부에서만 생존한다
        <S.Outer>
            <S.Inner>
                <WordsetName propValue={setName} />
                <S.Line />
                <WordList listData={processedList} />
                <DetailViewModal />
            </S.Inner>
        </S.Outer>
    );
};

const WordsetPage = () => {
    return (
        <Provider>
            <Content />
        </Provider>
    );
};

export default WordsetPage;

const S = {
    Outer: styled.div`
        height: 100vh;
        width: 100vw;
    `,
    Inner: styled.div`
        margin: 20px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
    `,
    Line: styled.div`
        height: 1px;
        background: ${Colors["neutral-dark-medium"]};
        margin: 8px 0;
    `
};
