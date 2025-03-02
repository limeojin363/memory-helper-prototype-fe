import S from "./styled";
import Icon from "../../../components/icons/Icon";
import { useGenerateNewWordSetPageData } from "../hooks/useGeneratingNewWordSetPageData";
import EngArea from "./EngArea";
import KorArea from "./KorArea";

const WordInputPairItem = ({ pairId }: { pairId: string }) => {
    const [, setRoot] = useGenerateNewWordSetPageData();

    const onClickDelete = () =>
        setRoot((draft) => draft.filter((pairItem) => pairItem.id !== pairId));

    return (
        <S.WordInputPairItemWrapper>
            <S.IcButtonWrapper size={28}>
                <Icon
                    onClick={onClickDelete}
                    colorName="neutral-dark-darkest"
                    iconName="trash"
                    size={24}
                />
            </S.IcButtonWrapper>
            <S.InputArea>
                <EngArea pairId={pairId} />
                <KorArea pairId={pairId} />
            </S.InputArea>
        </S.WordInputPairItemWrapper>
    );
};

export default WordInputPairItem;
