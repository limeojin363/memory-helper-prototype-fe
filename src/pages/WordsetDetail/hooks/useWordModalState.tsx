import Icon from "../../../components/icons/Icon";
import { TypeKey } from "../../../components/type-selector/TypeSelector";
import { NavigationInfo } from "../../../components/detail-modal/DetailModal";
import WordsetDetailPage from "../components";
import { useState } from "react";

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
    mode: "VIEW" | "MODIFY";
};

export type ModalStatus = ItemData | "CREATE-NEW-WORD" | null;

// 기존 단어를 다루는가?
export const isExisting = (modalInfo: ModalStatus): modalInfo is ItemData =>
    typeof modalInfo === "object" && modalInfo !== null;

// 제공하는 정보
// Modal의 열기(CREATE, VIEW)와 닫기 함수
// 모드 수정(VIEW <-> MODIFY) 함수
// navigation 객체
// 현재 선택된 단어의 정보(status)
const useWordModalState = () => {
    const [status, setStatus] = useState<ModalStatus>(null);
    const listData = WordsetDetailPage.usePageData().list;

    const openWithSelection = (wordId: number) => {
        const selectedData = listData.find((item) => item.wordId === wordId);
        if (selectedData)
            setStatus({
                selectedData,
                mode: "VIEW",
            });
    };

    const selectModeOnExisting = (mode: "MODIFY" | "VIEW") => {
        if (!isExisting(status)) return;

        setStatus({
            ...status,
            mode,
        });
    };

    const close = () => setStatus(null);

    const openWithCreateMode = () => setStatus("CREATE-NEW-WORD");

    const isWordsetModifiable = WordsetDetailPage.usePageData().examIds.length === 0;

    //  << case 정리 >>
    // view
    //  - prev
    //    - 이전 요소 O -> ["<-", active, 동작]
    //    - 이전 요소 X -> ["<-", deactive, 미동작]
    //  - next:
    //    - 다음 요소 O -> ["->", active, 동작]
    //    - 다음 요소 X
    //      - isWordsetModifiable -> ["NEW", active, 동작]
    //      - !isWordsetModifiable -> X
    // create
    //  - prev:
    //    - 이전 요소 O -> ["<-", active, 동작]
    //    - 이전 요소 X -> ["<-", deactive, 미동작]
    //  - next:
    //    X
    const infoForNavigation: {
        next?: NavigationInfo;
        prev?: NavigationInfo;
    } = (() => {
        if (isExisting(status)) {
            const currentIndex = listData.findIndex(
                (item) => item.wordId === status.selectedData.wordId,
            );
            const doesPrevExists = currentIndex !== 0;
            const prevItem = listData[currentIndex - 1];
            const doesNextExists = currentIndex !== listData.length - 1;
            const nextItem = listData[currentIndex + 1];

            return {
                prev: doesPrevExists ? {
                    navigate: () => openWithSelection(prevItem.wordId),
                    content: (
                        <Icon
                            colorName="neutral-dark-darkest"
                            iconName="lined-arrow-prev"
                            size={20}
                        />
                    ),
                    active: true,
                }: undefined,
                next: doesNextExists ? {
                    navigate: () => openWithSelection(nextItem.wordId),
                    content: (
                        <Icon
                            colorName="neutral-dark-darkest"
                            iconName="lined-arrow-next"
                            size={20}
                        />
                    ),
                    active: true,
                } : isWordsetModifiable ? {
                    navigate: openWithCreateMode,
                    content: (
                        <Icon
                            colorName="neutral-dark-darkest"
                            iconName="plus"
                            size={20}
                        />
                    ),
                    active: true,
                } : undefined,
            };
        } else {
            const doesPrevExists = listData.length > 0;
            const prevItem = listData[listData.length - 1];

            return {
                prev: {
                    navigate: doesPrevExists
                        ? () => openWithSelection(prevItem.wordId)
                        : () => { },
                    content: (
                        <Icon
                            colorName="neutral-dark-darkest"
                            iconName="lined-arrow-prev"
                            size={20}
                        />
                    ),
                    active: doesPrevExists,
                },
            };
        }
    })();

    return {
        close,
        openWithCreateMode,
        openWithSelection,
        status,
        selectModeOnExisting,
        ...infoForNavigation,
    };
};

export default useWordModalState;
