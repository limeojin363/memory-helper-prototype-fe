import WordDetailEditor from "./WordDetailEditor";
import useWordModalState, { isExisting } from "../../hooks/useWordModalState";
import DetailModal from "../../../../components/detail-modal/DetailModal";
import { createContext, useContext } from "react";
import WordsetDetailPage from "..";
import { TypeKey } from "../../../../components/type-selector/TypeSelector";

type Listeners = Pick<
  ReturnType<typeof useWordModalState>,
  | "close"
  | "selectModeOnExisting"
  | "openWithCreateMode"
  | "openWithSelection"
  | "next"
  | "prev"
>;

type Meta = {
  isOpen: boolean;
  switchable: boolean;
  editable: boolean;
  wordId: number | null;
  mode: "CREATE" | "VIEW" | "MODIFY";
};

type Values = {
  initialValues: {
    engWord: string;
    korMeanings: {
      type: TypeKey;
      value: string;
    }[];
  };
};

const WordDetailModalContext = createContext<Listeners & Meta & Values>({
  close: () => {},
  openWithCreateMode: () => {},
  openWithSelection: () => {},
  selectModeOnExisting: () => {},
  editable: false,
  switchable: false,
  isOpen: false,
  wordId: null,
  initialValues: {
    engWord: "",
    korMeanings: [],
  },
  mode: "CREATE",
});

const useModalContext = () => useContext(WordDetailModalContext);

export const WordModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    status,
    next,
    prev,
    close,
    openWithCreateMode,
    openWithSelection,
    selectModeOnExisting,
  } = useWordModalState();

  // 생성된 exam이 존재한다면 편집 모드로 진입 불가능하다
  const switchable = WordsetDetailPage.usePageData().examIds.length === 0;
  const isOpen = !!status;
  const wordId = isExisting(status) ? status.selectedData.wordId : null;
  const editable = isExisting(status) ? status.mode === "MODIFY" : true;
  const initialValues = isExisting(status)
    ? {
        engWord: status.selectedData.word,
        korMeanings: status.selectedData.meaning,
      }
    : { engWord: "", korMeanings: [] };
  const mode = isExisting(status) ? status.mode : "CREATE";

  return (
    <WordDetailModalContext.Provider
      value={{
        openWithCreateMode,
        openWithSelection,
        selectModeOnExisting,
        close,
        isOpen,
        next,
        prev,
        switchable,
        wordId,
        editable,
        initialValues,
        mode,
      }}
    >
      {children}
    </WordDetailModalContext.Provider>
  );
};

const WordDetailModal = () => {
  const { next, prev, close, isOpen } = useModalContext();

  if (!isOpen) return null;

  return (
    <DetailModal close={close} next={next} prev={prev}>
      <WordDetailEditor />
    </DetailModal>
  );
};

WordDetailModal.useModalContext = useModalContext;

export default WordDetailModal;
