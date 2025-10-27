import Icon from "../../../../components/icons/Icon";
import { Colors } from "../../../../designs/colors";
import styled from "@emotion/styled";
import Button1 from "../../../../components/button1";
import useDeleteWordsetAndNavigate from "../../hooks/useDeleteWordsetAndNavigate";
import Text from "../../../../components/texts/Text";
import WordDetailModal, { WordModalProvider } from "../WordDetailModal";
import { TypeKey } from "../../../../components/type-selector/TypeSelector";
import WordsetDetailPage from "..";

export type WordItemProps = {
  id: number;
  eng: string;
  firstMeaning: string;
  meaningCount: number;
};

const OpenCreateModal = () => {
  const { openWithCreateMode } = WordDetailModal.useModalContext();

  const isWordsetModifiable =
    WordsetDetailPage.usePageData().examIds.length === 0;

  return (
    <Button1
      disabled={!isWordsetModifiable}
      height={"40px"}
      onClick={openWithCreateMode}
      colorStyle={isWordsetModifiable ? "Neutral" : "Disabled"}
    >
      <Icon colorName="neutral-dark-darkest" iconName="plus" size={20} />
    </Button1>
  );
};

// Pure
const WordItem = ({ id, eng, firstMeaning, meaningCount }: WordItemProps) => {
  const mainText = eng;
  const sideText = `"${firstMeaning}" 등 ${meaningCount}개 의미`;

  const { openWithSelection: select } = WordDetailModal.useModalContext();

  return (
    <Button1 height={"40px"} onClick={() => select(id)} colorStyle="Neutral">
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
}): WordItemProps => ({
  eng: item.word,
  firstMeaning: item.meaning[0].value,
  meaningCount: item.meaning.length,
  id: item.wordId,
});

// List 영역과 Modal 영역으로 나뉨
const WordsArea = () => {
  const pageData = WordsetDetailPage.usePageData();
  const wordsetId = WordsetDetailPage.useWordsetId();

  const deleteAndNavigate = useDeleteWordsetAndNavigate(wordsetId);
  const processedListData = pageData.list.map(listProcessCallback);

  const isWordsetModifiable =
    WordsetDetailPage.usePageData().examIds.length === 0;

  return (
    <WordModalProvider>
      <S.WordsAreaContainer>
        <Button1
          disabled={!isWordsetModifiable}
          onClick={deleteAndNavigate}
          colorStyle="Neutral"
        >
          <Text fontStyle="action-lg" label="단어장 삭제" />
        </Button1>
        <S.Separator />
        <WordList processedListData={processedListData} />
        <OpenCreateModal />
      </S.WordsAreaContainer>
      <WordDetailModal />
    </WordModalProvider>
  );
};

const WordList = ({
  processedListData,
}: {
  processedListData: WordItemProps[];
}) => {
  const length = processedListData.length;

  if (length === 0) return null;

  return (
    <>
      {processedListData.map((item) => (
        <WordItem {...item} />
      ))}
      <S.Separator />
    </>
  );
};

export default WordsArea;

const S = {
  WordsAreaContainer: styled.div`
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
