import Icon from "../../../../components/icons/Icon";
import { Colors } from "../../../../designs/colors";
import styled from "@emotion/styled";
import useWordModalState from "../../hooks/useWordModalState";
import Button1 from "../../../../components/button1";
import useDeleteWordsetAndNavigate from "../../hooks/useDeleteWordsetAndNavigate";
import Text from "../../../../components/texts/Text";
import WordDetailModal from "../WordDetailModal";
import { GetWordsetDetailData } from "../../../../apis/services/wordset/get-wordset-detail/index.types";
import { TypeKey } from "../../../../components/type-selector/TypeSelector";
import { useEffect } from "react";

export type WordItemProps = {
    id: number;
    eng: string;
    firstMeaning: string;
    meaningCount: number;
};

const OpenCreateModal = () => {
    const { openWithCreateMode: openCreateMode } = useWordModalState();

    return (
        <Button1 height={"40px"} onClick={openCreateMode} colorStyle="Neutral">
            <Icon colorName="neutral-dark-darkest" iconName="plus" size={20} />
        </Button1>
    );
};

// Pure
const WordItem = ({ id, eng, firstMeaning, meaningCount }: WordItemProps) => {
    const mainText = eng;
    const sideText = `"${firstMeaning}" 등 ${meaningCount}개 의미`;

    const { openWithSelection: select } = useWordModalState();

    return (
        <Button1
            height={"40px"}
            onClick={() => select(id)}
            colorStyle="Neutral"
        >
            <S.ItemInner>
                <div>{mainText}</div>
                <div>{sideText}</div>
            </S.ItemInner>
        </Button1>
    );
};

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

// List 영역과 Modal 영역으로 나뉨
const WordsArea = ({
    listData,
    wordsetId,
}: {
    listData: GetWordsetDetailData["list"];
    wordsetId: number;
}) => {
    const { setListData } = useWordModalState();
    const deleteAndNavigate = useDeleteWordsetAndNavigate(wordsetId);
    const processedList = listData.map(listProcessCallback);

    // 동기화
    // 영 맘에 들지 않는다. useEffect는 날릴 수 있을 때 날린다.
    useEffect(() => {
        if (listData) setListData(listData);
    }, [setListData, listData]);

    return (
        <>
            <S.ListContainer>
                <Button1 onClick={deleteAndNavigate} colorStyle="Neutral">
                    <Text fontStyle="action-lg" label="단어장 삭제" />
                </Button1>
                <S.Separator />
                {listData.length > 0 && (
                    <>
                        {processedList.map((item) => (
                            <WordItem {...item} />
                        ))}
                        <S.Separator />
                    </>
                )}
                <OpenCreateModal />
            </S.ListContainer>
            <WordDetailModal wordsetId={wordsetId} />
        </>
    );
};

export default WordsArea;

const S = {
    ListContainer: styled.div`
        width: calc(100% - 80px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
        gap: 8px;
    `,
    ItemWrapper: styled.button`
        height: 40px;

        background-color: ${Colors["neutral-light-dark"]};

        border: none;
        box-shadow: 0 0 0 2px ${Colors["neutral-dark-medium"]} inset;
        border-radius: 12px;

        display: flex;
        justify-content: center;
        align-items: center;

        :active {
            transform: scale(0.99);
        }
        :focus-visible {
            box-shadow: 0 0 0 3px ${Colors["neutral-dark-darkest"]} inset;
        }
    `,
    ItemInner: styled.div`
        flex: 1;
        padding: 0 12px;

        display: flex;
        justify-content: space-between;
        align-items: center;
    `,
    Separator: styled.div`
        width: 100%;
        height: 1.8px;
        background-color: ${Colors["neutral-dark-darkest"]};
    `,
};
