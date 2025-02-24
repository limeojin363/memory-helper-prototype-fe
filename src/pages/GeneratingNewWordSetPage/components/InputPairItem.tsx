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
import { ChangeEventHandler } from "react";
import { EngInputStatus } from "../types";

const EngArea = ({
    value,
    onChange,
    status,
}: {
    onChange: ChangeEventHandler<HTMLInputElement>;
    value: string;
    status: EngInputStatus
}) => {
    return (
        <S.EngAreaContainer>
            <Text fontStyle="heading-5" label="Eng" />
            <EngInput
                placeholder="Enter English word"
                value={value}
                onChange={onChange}
                status={status}
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
                <Icon
                    colorName="neutral-dark-darkest"
                    iconName="plus"
                    size={12}
                    onClick={addCustomKorInput}
                />
                <S.KorItemsWrapper>
                    {pair.korInputs!.map((korItem) => (
                        <KorItem
                            key={korItem.id}
                            korItemId={korItem.id}
                            pairId={pairId}
                        />
                    ))}
                </S.KorItemsWrapper>
            </S.KorTopWrapper>
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
            <S.TrashWrapper>
                <Icon
                    onClick={onClickDelete}
                    colorName="neutral-dark-darkest"
                    iconName="trash"
                    size={24}
                />
            </S.TrashWrapper>
            <S.InputArea>
                <EngArea
                    value={pair!.engInput.value}
                    onChange={onChangeEngInput}
                    status={engStatus}
                />
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

    return (
        <S.KorItemWrapper>
            <KorInput
                placeholder="영단어를 먼저 입력해주세요"
                value={korInput!.value}
                onChange={(e) =>
                    setKorInput((draft) => {
                        draft!.value = e.target.value;
                    })
                }
                status={korInput!.status}
                key={korItemId}
            />
            <S.KorTrashWrapper>
                <Icon
                    onClick={deleteThis}
                    colorName="neutral-dark-darkest"
                    iconName="trash"
                    size={16}
                />
            </S.KorTrashWrapper>
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
    `,
    InputArea: styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;

        padding: 4px;
        border: 1px solid;
    `,
    EngAreaContainer: styled.div`
        flex: 1;

        display: flex;
        flex-direction: column;
        gap: 2px;
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
    `,
    KorTrashWrapper: styled.div`
        position: absolute;

        display: flex;
        align-items: center;
        justify-content: center;

        right: 4px;
        /* Icon size가 16px이므로 그 절반만큼 보정*/
        bottom: calc(50% - 8px);
    `,
    TrashWrapper: styled.div`
        width: 24px;
        height: 24px;
        border: 1px solid;
    `,
};
