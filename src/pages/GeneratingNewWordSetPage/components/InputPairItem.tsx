import S from "./styled";
import Icon from "../../../components/icons/Icon";
import EngArea from "./EngArea";
import KorArea from "./KorArea";
import { usePageState } from "../hooks/states/usePageStateNew";
import usePairStatus from "../hooks/states/usePairStatus";

const WordInputPairItem = ({ pairId }: { pairId: string }) => {
    const { deletePair } = usePageState();

    const onClickDelete = () => deletePair(pairId);

    const pairStatus = usePairStatus(pairId);

    return (
        <S.WordInputPairItemWrapper pairStatus={pairStatus}>
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
