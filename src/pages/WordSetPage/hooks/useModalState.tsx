import Icon from "../../../components/icons/Icon";
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

// props drilling 방지와 외부 훅에서의 접근을 위한 global state화
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

    const openCreateMode = () => {setStatus("CREATE-NEW-WORD")};

    //  << case 정리 >>
    // view
    //  - prev
    //    - 이전 요소 O -> ["<-", active, 동작]
    //    - 이전 요소 X -> ["<-", deactive, 미동작]
    //  - next:
    //    - 다음 요소 O -> ["->", active, 동작]
    //    - 다음 요소 X -> ["NEW", active, 동작]
    // create
    //  - prev:
    //    - 이전 요소 O -> ["<-", active, 동작]
    //    - 이전 요소 X -> ["<-", deactive, 미동작]
    //  - next:
    //    X
    const infoForNavigation = (() => {
        if (!status) return null;

        if (isViewMode(status)) {
            const currentIndex = list.findIndex(
                (item) => item.wordId === status.selectedData.wordId,
            );
            const doesPrevExists = currentIndex !== 0;
            const prevItem = list[currentIndex - 1];
            const doesNextExists = currentIndex !== list.length - 1;
            const nextItem = list[currentIndex + 1];

            return {
                prev: {
                    navigation: doesPrevExists
                        ? () => select(prevItem.wordId)
                        : () => {},
                    content: (
                        <Icon
                            colorName="neutral-dark-darkest"
                            iconName="lined-arrow-prev"
                            size={20}
                        />
                    ),
                    active: doesPrevExists,
                },
                next: {
                    navigation: doesNextExists
                        ? () => select(nextItem.wordId)
                        : openCreateMode,
                    content: doesNextExists ? (
                        <Icon
                            colorName="neutral-dark-darkest"
                            iconName="lined-arrow-next"
                            size={20}
                        />
                    ) : (
                        <Icon
                            colorName="neutral-dark-darkest"
                            iconName="plus"
                            size={20}
                        />
                    ),
                    active: true,
                },
            };
        } else {
            const doesPrevExists = list.length > 0;
            const prevItem = list[list.length - 1];

            return {
                prev: {
                    navigation: doesPrevExists
                        ? () => select(prevItem.wordId)
                        : () => {},
                    content: (
                        <Icon
                            colorName="neutral-dark-darkest"
                            iconName="lined-arrow-prev"
                            size={20}
                        />
                    ),
                    active: doesPrevExists,
                },
                next: null
            };
        }
    })();

    return {
        close,
        openCreateMode,
        select,
        status,
        infoForNavigation,
    };
};
