import WordDetailEdit, { WordDetailEditProps } from "./WordDetailEdit";
import useWordModalState, { isViewMode } from "../../hooks/useWordModalState";
import DetailModal from "../../../../components/detail-modal/DetailModal";
import { GetWordsetDetailData } from "../../../../apis/services/wordset/get-wordset-detail/index.types";
import { useEffect } from "react";

export type WordDetailModalProps = {
    listData?: GetWordsetDetailData["list"];
    wordsetId: number;
};

const WordDetailModal = ({ listData, wordsetId }: WordDetailModalProps) => {
    const { close, status, next, prev, setListData } = useWordModalState();

    // 영 맘에 들지 않는다. useEffect는 날릴 수 있을 때 날린다.
    useEffect(() => {
        if (listData) setListData(listData);
    }, [setListData, listData]);

    if (!status) return null;

    const editComponentProps: WordDetailEditProps = {
        mode: isViewMode(status) ? "MODIFY" : "CREATE",
        initialState: isViewMode(status)
            ? {
                  meanings: status.selectedData.meaning,
                  word: status.selectedData.word,
              }
            : undefined,
        wordsetId,
    }

    return (
        <DetailModal close={close} next={next} prev={prev}>
            <WordDetailEdit {...editComponentProps} />
        </DetailModal>
    );
};

export default WordDetailModal;
