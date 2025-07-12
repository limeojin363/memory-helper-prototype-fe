import WordDetailEdit, { WordDetailEditProps } from "./EditorArea";
import useWordModalState, { isExisting } from "../../hooks/useWordModalState";
import DetailModal from "../../../../components/detail-modal/DetailModal";

export type WordDetailModalProps = {
    wordsetId: number;
};

const WordDetailModal = ({ wordsetId }: WordDetailModalProps) => {
    const { close, status, next, prev } = useWordModalState();

    if (!status) return null;

    const editComponentProps: WordDetailEditProps = {
        mode: isExisting(status) ? status.mode : "CREATE",
        initialValues: isExisting(status)
            ? {
                  meanings: status.selectedData.meaning,
                  word: status.selectedData.word,
              }
            : undefined,
        wordsetId,
        wordId: isExisting(status) ? status.selectedData.wordId : null,
    };

    return (
        <DetailModal close={close} next={next} prev={prev}>
            <WordDetailEdit {...editComponentProps} />
        </DetailModal>
    );
};

export default WordDetailModal;
