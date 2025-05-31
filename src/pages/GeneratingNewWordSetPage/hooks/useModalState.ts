import { TypeKey } from "../../WordSetDetailPage/components/WordSetList";
import { useWordsetDetailData } from "./useServerData";
import { atom, useAtom } from "jotai";

export type ItemData = {
    selectedData: {
        wordId: number;
        word: string;
        meaning: Array<{
            type: TypeKey;
            value: string;
        }>;
        createdAt: string;
        gpt: boolean;
    };
};

export type ModalStatus = ItemData | "CREATE-NEW-WORD" | null;

export const isViewMode = (modalInfo: ModalStatus): modalInfo is ItemData =>
    typeof modalInfo === "object";

export const isCreateMode = (
    modalInfo: ModalStatus,
): modalInfo is "CREATE-NEW-WORD" => modalInfo === "CREATE-NEW-WORD";

// props drilling 방지와 외부 훅에서의 접근 위한 global state화
export const modalStatusAtom = atom<ModalStatus>(null);

export const useModalState = () => {
    const [status, setStatus] = useAtom<ModalStatus>(modalStatusAtom);
    const detailData = useWordsetDetailData();
    const list = detailData?.list || [];

    const select = (wordId: number) => {
        const selectedData = list.find((item) => item.wordId === wordId);
        if (selectedData)
            setStatus({
                selectedData,
            });
    };

    const close = () => setStatus(null);

    const navigation = {
        prev: () => {
            if (isViewMode(status)) {
                const currIdx = list.findIndex(
                    (item) => item.wordId === status.selectedData.wordId,
                );

                if (currIdx > 0) {
                    const prevItem = list[currIdx - 1];
                    setStatus({
                        selectedData: prevItem,
                    });
                } else {
                    // 첫 번째 아이템일 때는 아무 동작도 하지 않음
                }
            }
        },
        next: () => {
            if (isViewMode(status)) {
                const currIdx = list.findIndex(
                    (item) => item.wordId === status.selectedData.wordId,
                );

                if (currIdx < list.length - 1) {
                    const nextItem = list[currIdx + 1];
                    setStatus({
                        selectedData: nextItem,
                    });
                } else {
                    setStatus("CREATE-NEW-WORD");
                }
            }
        },
    };

    const openCreateMode = () => setStatus("CREATE-NEW-WORD");

    return {
        close,
        openCreateMode,
        select,
        status,
        navigation,
    };
};
