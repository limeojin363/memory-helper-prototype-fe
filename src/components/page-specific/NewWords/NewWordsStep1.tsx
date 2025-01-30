import styled from "@emotion/styled";
import { atom, useAtom } from "jotai";
import _ from "lodash";
import uuid from "react-uuid";
import Icon from "../../general/icons/Icon";
import Text from "../../general/texts/Text";
import WordInput from "../../general/inputs/WordInput";
import { ChangeEvent } from "react";

type KorItemType = { korItemId: string; value: string };

type WordInputPairListDataType = {
    pairId: string;
    engValue: string;
    korItems: KorItemType[];
};

const makeNewKorItem = (): KorItemType => ({
    korItemId: uuid(),
    value: "",
});

const makeNewPairItem = (): WordInputPairListDataType => {
    return {
        pairId: uuid(),
        engValue: "",
        korItems: [makeNewKorItem()],
    };
};

const listAtom = atom<WordInputPairListDataType[]>([makeNewPairItem()]);

// props drilling 방지와 가독성 향상을 위함
const useWordInputPairListState = () => {
    const [pairList, setPairList] = useAtom(listAtom);

    const addNewPairItem = () =>
        setPairList((prev) => [...prev, makeNewPairItem()]);

    const deletePairItem = (pairId: string) =>
        setPairList((prev) => [
            ...prev.filter((item) => item.pairId !== pairId),
        ]);

    const addNewKorItemToSpecificPair = (pairId: string) =>
        setPairList((prev) => {
            const next = _.cloneDeep(prev);
            const selectedPair = next.find((item) => item.pairId === pairId)!;
            selectedPair.korItems = [
                ...selectedPair!.korItems,
                makeNewKorItem(),
            ];

            console.log(selectedPair.korItems);

            return next;
        });

    const deleteSingleKorItemOfSpecificPair = (
        pairId: string,
        korItemId: string,
    ) =>
        setPairList((prev) => {
            const next = _.cloneDeep(prev);
            const selectedPair = next.find((item) => item.pairId === pairId)!;
            selectedPair.korItems = selectedPair.korItems.filter(
                (item) => item.korItemId !== korItemId,
            );

            return next;
        });

    const getPairDataById = (pairId: string) =>
        pairList.find((pairItem) => pairItem.pairId === pairId)!;

    const setEngValueOfSpecificPair = (pairId: string, value: string) =>
        setPairList((prev) => {
            const next = _.cloneDeep(prev);

            const selectedPair = next.find((item) => item.pairId === pairId)!;
            selectedPair.engValue = value;

            return next;
        });

    const setKorValueOfSpecificPair = (
        pairId: string,
        korItemId: string,
        value: string,
    ) =>
        setPairList((prev) => {
            const next = _.cloneDeep(prev);

            const selectedPair = next.find((item) => item.pairId === pairId)!;
            const selectedKorItem = selectedPair.korItems.find(
                (item) => item.korItemId === korItemId,
            )!;
            selectedKorItem.value = value;

            return next;
        });

    return {
        pairList,
        addNewPairItem,
        deletePairItem,
        addNewKorItemToSpecificPair,
        deleteSingleKorItemOfSpecificPair,
        getPairDataById,
        setEngValueOfSpecificPair,
        setKorValueOfSpecificPair,
    };
};

const NewWordsStep1 = () => {
    const { pairList, addNewPairItem } = useWordInputPairListState();

    return (
        <S.Root>
            {pairList.map(({ pairId }) => (
                <WordInputPairItem pairId={pairId} key={pairId} />
            ))}
            <Icon
                colorName="neutral-dark-darkest"
                iconName="plus"
                size={30}
                onClick={addNewPairItem}
            />
        </S.Root>
    );
};

const WordInputPairItem = ({ pairId }: { pairId: string }) => {
    const {
        addNewKorItemToSpecificPair,
        deletePairItem,
        deleteSingleKorItemOfSpecificPair,
        getPairDataById,
        setEngValueOfSpecificPair,
        setKorValueOfSpecificPair,
    } = useWordInputPairListState();

    const addKor = () => addNewKorItemToSpecificPair(pairId);

    const deleteThis = () => deletePairItem(pairId);

    const deleteKorItem = (korItemId: string) => () =>
        deleteSingleKorItemOfSpecificPair(pairId, korItemId);

    const onChangeEngValue = (e: ChangeEvent<HTMLInputElement>) =>
        setEngValueOfSpecificPair(pairId, e.target.value);

    const onChangeKorValue =
        (korItemId: string) => (e: ChangeEvent<HTMLInputElement>) =>
            setKorValueOfSpecificPair(pairId, korItemId, e.target.value);

    const { engValue, korItems } = getPairDataById(pairId);

    return (
        <S.WordInputPairItemWrapper>
            <S.TrashWrapper>
                <Icon
                    onClick={deleteThis}
                    colorName="neutral-dark-darkest"
                    iconName="trash"
                    size={24}
                />
            </S.TrashWrapper>
            <S.InputArea>
                <S.EngArea>
                    <Text fontStyle="heading-5" label="Eng" />
                    <WordInput
                        placeholder="placeholder"
                        value={engValue}
                        onChange={onChangeEngValue}
                        status="INITIAL"
                    />
                </S.EngArea>
                <S.KorArea>
                    <S.KorTopWrapper>
                        <Text fontStyle="heading-5" label="Kor" />
                        <Icon
                            colorName="neutral-dark-darkest"
                            iconName="plus"
                            size={13.5}
                            onClick={addKor}
                        />
                    </S.KorTopWrapper>
                    {korItems.map((korItem) => (
                        <S.KorItemWrapper>
                            <WordInput
                                placeholder="placeholder"
                                value={korItem.value}
                                onChange={onChangeKorValue(korItem.korItemId)}
                                status="INITIAL"
                                key={korItem.korItemId}
                            />
                            <S.KorTrashWrapper>
                                <Icon
                                    onClick={deleteKorItem(korItem.korItemId)}
                                    colorName="neutral-dark-darkest"
                                    iconName="trash"
                                    size={16}
                                />
                            </S.KorTrashWrapper>
                        </S.KorItemWrapper>
                    ))}
                </S.KorArea>
            </S.InputArea>
        </S.WordInputPairItemWrapper>
    );
};

const S = {
    Root: styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: center;
    `,
    WordInputPairItemWrapper: styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 4px;
    `,
    InputArea: styled.div`
        width: 100%;
        display: flex;
        gap: 8px;
        padding: 4px;
        border: 1px solid;
    `,
    EngArea: styled.div`
        flex: 1;

        display: flex;
        flex-direction: column;
        gap: 2px;
    `,
    KorArea: styled.div`
        flex: 1;

        display: flex;
        flex-direction: column;
        gap: 2px;
    `,
    KorTopWrapper: styled.div`
        display: flex;
        justify-content: space-between;
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

export default NewWordsStep1;
