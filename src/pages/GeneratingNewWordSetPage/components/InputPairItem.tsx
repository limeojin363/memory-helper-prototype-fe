import styled from "@emotion/styled";
import Icon from "../../../components/icons/Icon";
import Text from "../../../components/texts/Text";
import KorInput from "./KorInput";
import {
    makeNewCustomKorItem,
    useKorInput,
    useGenerateNewWordSetPageData,
    usePair,
} from "../hooks/useGeneratingNewWordSetPageData";
import EngInput from "./EngInput";
import useRequestKorOptions from "../hooks/useRequestKorOptions";
import { Colors } from "../../../designs/colors";

const EngArea = ({ pairId }: { pairId: string }) => {
    const [pair, setPair] = usePair(pairId);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setPair((draft) => {
            draft!.engInput.value = e.target.value;
        });

    const requestOptions = useRequestKorOptions(pairId);

    return (
        <S.EngAreaContainer>
            <Text fontStyle="heading-5" label="Eng" />
            <EngInput
                placeholder="Enter English word"
                value={pair!.engInput.value}
                status={pair!.engInput.status}
                onChange={onChange}
                onBlur={requestOptions}
            />
        </S.EngAreaContainer>
    );
};

const KorArea = ({ pairId }: { pairId: string }) => {
    const [pair, setPair] = usePair(pairId);

    if (!pair) return null;

    if (pair.status === "INITIAL") return null;

    if (pair.status === "REQUESTED-OPTIONS")
        return (
            <S.KorAreaContainer>
                <S.KorTopWrapper>
                    <Text fontStyle="heading-5" label="Kor" />
                </S.KorTopWrapper>
                <S.KorItemsWrapper>"LOADING"</S.KorItemsWrapper>
            </S.KorAreaContainer>
        );

    const addCustomKorInput = () =>
        setPair((draft) => {
            draft!.korInputs!.push(makeNewCustomKorItem());
        });

    return (
        <S.KorAreaContainer>
            <S.KorTopWrapper>
                <Text fontStyle="heading-5" label="Kor" />
                <S.IcButtonWrapper size={16}>
                    <Icon
                        colorName="neutral-dark-darkest"
                        iconName="plus"
                        size={12}
                        onClick={addCustomKorInput}
                    />
                </S.IcButtonWrapper>
            </S.KorTopWrapper>
            <S.KorItemsWrapper>
                {pair.korInputs!.map((korItem) => (
                    <KorItem
                        key={korItem.id}
                        pairId={pairId}
                        korItemId={korItem.id}
                    />
                ))}
            </S.KorItemsWrapper>
        </S.KorAreaContainer>
    );
};

const WordInputPairItem = ({ pairId }: { pairId: string }) => {
    const [, setRoot] = useGenerateNewWordSetPageData();

    const [pair, setPair] = usePair(pairId);

    const onClickDelete = () =>
        setRoot((draft) => draft.filter((pairItem) => pairItem.id !== pairId));

    const onChangeEngInput = (e: React.ChangeEvent<HTMLInputElement>) =>
        setPair((draft) => {
            draft!.engInput.value = e.target.value;
        });

    const engStatus = pair!.engInput.status;

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

const KorItem = ({
    korItemId,
    pairId,
}: {
    korItemId: string;
    pairId: string;
}) => {
    const [korInput, setKorInput] = useKorInput(pairId, korItemId);

    const [, setPair] = usePair(pairId);

    const deleteThis = () =>
        setPair((draft) => {
            draft!.korInputs = draft!.korInputs!.filter(
                (item) => item.id !== korItemId,
            );
        });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setKorInput((draft) => {
            draft!.value = e.target.value;
        });

    return (
        <S.KorItemWrapper>
            <KorInput
                placeholder="영단어를 먼저 입력해주세요"
                value={korInput!.value}
                onChange={onChange}
                status={korInput!.status}
                key={korItemId}
            />
            <S.KorTrashPositioner>
                <S.IcButtonWrapper size={24}>
                    <Icon
                        onClick={deleteThis}
                        colorName="neutral-dark-darkest"
                        iconName="trash"
                        size={20}
                    />
                </S.IcButtonWrapper>
            </S.KorTrashPositioner>
        </S.KorItemWrapper>
    );
};

export default WordInputPairItem;

const S = {
    WordInputPairItemWrapper: styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 4px;

        padding: 4px;

        box-shadow: 0 0 0 1px black inset;

        border-radius: 10px;
    `,
    InputArea: styled.div`
        display: flex;
        flex-direction: column;
        gap: 8px;

        padding: 4px;
    `,
    EngAreaContainer: styled.div`
        flex: 1;

        display: flex;
        flex-direction: column;
        gap: 2px;
    `,
    KorPlusWrapper: styled.div`
        width: 16px;
        height: 16px;

        display: flex;
        align-items: center;
        justify-content: center;

        border: 1px solid;
        border-radius: 6px;

        background-color: ${Colors["neutral-light-darkest"]};
    `,
    KorAreaContainer: styled.div`
        flex: 1;

        display: flex;
        flex-direction: column;
        gap: 2px;
    `,
    KorTopWrapper: styled.div`
        display: flex;
        justify-content: space-between;
    `,
    KorItemsWrapper: styled.div`
        display: flex;
        flex-direction: column;
        gap: 6px;
    `,
    KorItemWrapper: styled.div`
        position: relative;
        display: flex;
        flex-direction: column;
    `,
    KorTrashPositioner: styled.div`
        position: absolute;

        right: 4px;
        bottom: calc(50%);
        transform: translateY(50%);
    `,
    IcButtonWrapper: styled.div<{ size: number }>`
        ${({ size }) => `
            width: ${size}px;
            height: ${size}px;
        `}

        display: flex;
        align-items: center;
        justify-content: center;

        background-color: ${Colors["neutral-light-darkest"]};

        border-radius: 30%;

        :active {
            transform: scale(0.9);
        }
    `,
};
