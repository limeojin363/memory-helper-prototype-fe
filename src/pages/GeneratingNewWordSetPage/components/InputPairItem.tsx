import S from "./styled";
import Icon from "../../../components/icons/Icon";
import {
    useGenerateNewWordSetPageData,
    usePair,
} from "../hooks/useGeneratingNewWordSetPageData";
import EngArea from "./EngArea";
import KorArea from "./KorArea";

const WordInputPairItem = ({ pairId }: { pairId: string }) => {
    const [, setRoot] = useGenerateNewWordSetPageData();

    const onClickDelete = () =>
        setRoot((draft) => draft.filter((pairItem) => pairItem.id !== pairId));

    const [pair] = usePair(pairId);

    const pairStatus = pair!.status;

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
