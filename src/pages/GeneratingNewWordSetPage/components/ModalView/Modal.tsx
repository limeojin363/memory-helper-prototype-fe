import styled from "@emotion/styled";
import ItemView from "./ItemView";
import WordDetailEdit from "./ItemEdit";
import {
    isCreateMode,
    isViewMode,
    ItemData,
    useModalState,
} from "../../hooks/useModalState";
import { Colors } from "../../../../designs/colors";
import Text from "../../../../components/texts/Text";

const ModalContent = ({ status }: { status: ItemData | "CREATE-NEW-WORD" }) => {
    if (isViewMode(status)) return <ItemView status={status} />;
    else if (isCreateMode(status)) return <WordDetailEdit mode="CREATE" />;
};

const DetailViewModal = () => {
    const { close, navigation, status } = useModalState();

    if (!status) return null;

    return (
        <S.BlackBg>
            <S.Wrapper>
                <S.CloseButton onClick={close}>
                    <Text
                        label="X"
                        fontStyle="action-lg"
                        colorName="neutral-dark-darkest"
                    />
                </S.CloseButton>
                <S.MainArea>
                    <ModalContent status={status} />
                </S.MainArea>
                <S.BottomButtonsArea>
                    <S.BottomButton onClick={navigation.prev}>
                        {"<-"}
                    </S.BottomButton>
                    <S.BottomButton onClick={navigation.next}>
                        {"->"}
                    </S.BottomButton>
                </S.BottomButtonsArea>
            </S.Wrapper>
        </S.BlackBg>
    );
};

export default DetailViewModal;

const S = {
    BlackBg: styled.div`
        position: fixed;
        top: 0;
        left: 0;

        width: 100vw;
        height: 100vh;

        background-color: rgba(0, 0, 0, 0.7);
    `,
    Wrapper: styled.div`
        position: relative;

        padding: 10px;
        height: calc(100% - 20px);

        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 8px;
    `,
    CloseButton: styled.button`
        height: 28px;
        width: 28px;
        background-color: ${Colors["neutral-light-medium"]};

        font-size: 16px;

        cursor: pointer;

        border: none;
        box-shadow: 0 0 0 2px ${Colors["neutral-dark-darkest"]} inset;
        border-radius: 50%;

        display: flex;
        justify-content: center;
        align-items: center;
    `,
    MainArea: styled.div`
        flex: 1;
        padding: 10px;

        background-color: ${Colors["neutral-light-medium"]};
        box-shadow: 0 0 0 2px ${Colors["neutral-dark-dark"]} inset;
        border-radius: 12px;

        display:flex;
        flex-direction: column
        
    `,
    BottomButtonsArea: styled.div`
        width: 100%;
        height: 80px;
        display: flex;
    `,
    BottomButton: styled.button`
        flex: 1;

        cursor: pointer;
        background-color: ${Colors["neutral-light-medium"]};
        box-shadow: 0 0 0 2px ${Colors["neutral-dark-dark"]} inset;

        border-radius: 12px;
    `,
};
