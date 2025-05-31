import styled from "@emotion/styled";
import { ChangeEventHandler, useState } from "react";
import { TypeKey } from "../../../WordSetDetailPage/components/WordSetList";
import { useMutation } from "@tanstack/react-query";
import WordApi from "../../../../apis/services/word";
import { getDataFromApiRes } from "../../../../apis/services";
import WordsetApi from "../../../../apis/services/wordset";
import { AddWordToSetReqParam } from "../../../../apis/services/wordset/add-word-to-wordset/index.types";
import { useWordsetId } from "../../hooks/useServerData";
import Text from "../../../../components/texts/Text";
import { Colors } from "../../../../designs/colors";
import Icon from "../../../../components/icons/Icon";
import { ClipLoader } from "react-spinners";
import { queryClient } from "../../../../routes/__root";
import TypeSelector from "./TypeSelector";
import { modalStatusAtom } from "../../hooks/useModalState";
import { useSetAtom } from "jotai";

const useEditorState = () => {
    const [state, setState] = useState<{
        word: string;
        meanings: {
            type: TypeKey;
            value: string;
        }[];
    }>(() => ({
        word: "",
        meanings: [
            {
                type: "noun",
                value: "",
            },
        ],
    }));

    const setModalStatus = useSetAtom(modalStatusAtom);

    const wordsetId = useWordsetId();

    const addCustomMeaning = () =>
        setState((prev) => ({
            ...prev,
            meanings: [
                ...prev.meanings,
                {
                    type: "noun",
                    value: "",
                },
            ],
        }));

    // TODO: MODIFY CASE 대응
    const { mutateAsync: submitWord } = useMutation({
        mutationFn: async () => {
            if (!wordsetId) return;

            const body: AddWordToSetReqParam = {
                setId: wordsetId,
                word: state.word,
                meaning: state.meanings,
            };

            const res = WordsetApi.AddWordToWordset(body);
            return getDataFromApiRes(res);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["wordsetDetail", wordsetId],
            });
            setModalStatus(null); // 모달 닫기
        },
    });

    const { mutate: loadServerMeanings, isPending: isLoadingMeanings } =
        useMutation({
            mutationFn: async () => {
                const res = WordApi.WordExists({
                    word: state.word,
                });
                const data = await getDataFromApiRes(res);
                const gottenMeanings = data.meaning;

                setState((prev) => ({
                    ...prev,
                    meanings: [...prev.meanings, ...gottenMeanings],
                }));
            },
        });

    const changeMeaningByIdx = (idx: number, value: string) =>
        setState((prev) => ({
            ...prev,
            meanings: prev.meanings.map((item, i) =>
                i === idx ? { ...item, value } : item,
            ),
        }));

    const changeTypeByIdx = (idx: number, type: TypeKey) =>
        setState((prev) => ({
            ...prev,
            meanings: prev.meanings.map((item, i) =>
                i === idx ? { ...item, type } : item,
            ),
        }));

    const deleteMeaningByIdx = (idx: number) =>
        setState((prev) => ({
            ...prev,
            meanings: prev.meanings.filter((_, i) => i !== idx),
        }));

    const changeWord = (word: string) =>
        setState((prev) => ({
            ...prev,
            word,
        }));

    return {
        state,
        isLoadingMeanings,
        loadServerMeanings,
        addCustomMeaning,
        changeMeaningByIdx,
        changeTypeByIdx,
        deleteMeaningByIdx,
        changeWord,
        submitWord: () => submitWord(),
    };
};

// 단어 편집 - 새로 생성 or 이미 존재하는 Item을 수정
const WordDetailEdit = ({ mode = "CREATE" }: { mode: "MODIFY" | "CREATE" }) => {
    const {
        state: { word, meanings },
        loadServerMeanings,
        isLoadingMeanings,
        addCustomMeaning,
        changeMeaningByIdx,
        changeTypeByIdx,
        deleteMeaningByIdx,
        changeWord,
        submitWord,
    } = useEditorState();

    return (
        <S.Root>
            <S.InputsAreaWrapper>
                <EngArea
                    isLoadingMeanings={isLoadingMeanings}
                    loadServerMeanings={loadServerMeanings}
                    value={word}
                    onChange={(e) => changeWord(e.target.value)}
                />
                <KorArea
                    meanings={meanings}
                    changeTypeByIdx={changeTypeByIdx}
                    changeMeaningByIdx={changeMeaningByIdx}
                    deleteMeaningByIdx={deleteMeaningByIdx}
                    addCustomMeaning={addCustomMeaning}
                />
            </S.InputsAreaWrapper>
            <S.GenButton onClick={submitWord}>
                <Text
                    fontStyle="action-lg"
                    label={mode === "CREATE" ? "생성" : "수정"}
                    colorName="neutral-dark-darkest"
                />
            </S.GenButton>
        </S.Root>
    );
};

const EngArea = ({
    value,
    onChange,
    loadServerMeanings,
    isLoadingMeanings,
}: {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    loadServerMeanings: () => void;
    isLoadingMeanings: boolean;
}) => {
    const showLoadButton = !isLoadingMeanings && !!value;

    return (
        <S.EngAreaWrapper>
            <Text fontStyle="heading-5" label="Eng" />
            <S.EngInputWrapper>
                <S.Input onChange={onChange} value={value} />
                {showLoadButton && (
                    <S.SideIconPositionor right={4}>
                        <S.IcButtonWrapper size={24}>
                            <Icon
                                colorName="neutral-dark-darkest"
                                iconName="submit"
                                size={12}
                                onClick={loadServerMeanings}
                            />
                        </S.IcButtonWrapper>
                    </S.SideIconPositionor>
                )}

                {isLoadingMeanings && (
                    <S.SideIconPositionor right={4}>
                        <ClipLoader
                            size={12}
                            color={Colors["neutral-dark-darkest"]}
                        />
                    </S.SideIconPositionor>
                )}
            </S.EngInputWrapper>
        </S.EngAreaWrapper>
    );
};

const KorArea = ({
    meanings,
    changeMeaningByIdx,
    changeTypeByIdx,
    deleteMeaningByIdx,
    addCustomMeaning,
}: {
    meanings: {
        type: TypeKey;
        value: string;
    }[];
    changeTypeByIdx: (idx: number, type: TypeKey) => void;
    changeMeaningByIdx: (idx: number, value: string) => void;
    deleteMeaningByIdx: (idx: number) => void;
    addCustomMeaning: () => void;
}) => {
    return (
        <S.KorAreaWrapper>
            <S.KorTopWrapper>
                <Text fontStyle="heading-5" label="Kor" />
                <S.IcButtonWrapper size={16}>
                    <Icon
                        colorName="neutral-dark-darkest"
                        iconName="plus"
                        size={12}
                        onClick={addCustomMeaning}
                    />
                </S.IcButtonWrapper>
            </S.KorTopWrapper>

            {meanings.map((item, idx) => (
                <S.KorMeaningItemWrapper key={idx}>
                    <TypeSelector
                        select={(t) => changeTypeByIdx(idx, t)}
                        value={item.type}
                    />
                    <S.Input
                        type="text"
                        value={item.value}
                        onChange={(e) =>
                            changeMeaningByIdx(idx, e.target.value)
                        }
                    />
                    <S.SideIconPositionor right={4}>
                        <S.IcButtonWrapper size={24}>
                            <Icon
                                colorName="neutral-dark-darkest"
                                iconName="trash"
                                size={20}
                                onClick={() => deleteMeaningByIdx(idx)}
                            />
                        </S.IcButtonWrapper>
                    </S.SideIconPositionor>
                </S.KorMeaningItemWrapper>
            ))}
        </S.KorAreaWrapper>
    );
};

export default WordDetailEdit;

const S = {
    Root: styled.div`
        flex: 1;

        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 16px;
    `,
    EngAreaWrapper: styled.div`
        position: relative;

        display: flex;
        flex-direction: column;
        gap: 8px;
    `,
    EngInputWrapper: styled.div`
        position: relative;
        width: 100%;

        display: flex;
    `,
    Input: styled.input`
        flex: 1;
        all: unset;
        border-radius: 12px;
        padding: 12px 16px;
        transition: all 0.1s;

        width: 100%;

        box-shadow: 0 0 0 1px ${Colors["neutral-light-darkest"]} inset;
    `,
    KorAreaWrapper: styled.div`
        flex: 1;

        display: flex;
        flex-direction: column;
        gap: 8px;
    `,
    KorTopWrapper: styled.div`
        display: flex;
        justify-content: space-between;
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
    KorMeaningItemWrapper: styled.div`
        position: relative;
        display: flex;
        align-items: center;
        gap: 8px;
    `,
    KorMeaningInput: styled.input`
        all: unset;
        border-radius: 12px;
        padding: 12px 16px;
        transition: all 0.1s;

        flex: 1;
    `,
    TypeSelectorWrapper: styled.div`
        position: relative;
    `,

    SideIconPositionor: styled.div<{ right: number }>`
        position: absolute;

        right: ${({ right }) => right}px;
        bottom: calc(50%);
        transform: translateY(50%);

        transition: all 0.2s ease-in-out;
    `,
    GenButton: styled.button`
        cursor: pointer;
        background-color: ${Colors["neutral-light-medium"]};
        box-shadow: 0 0 0 1px ${Colors["neutral-dark-dark"]} inset;
        border-radius: 12px;
        padding: 12px 16px;
    `,
    InputsAreaWrapper: styled.div`
        display: flex;
        flex-direction: column;
        gap: 16px;
        flex: 1;
    `,
    KorItemWrapper: styled.div`
        position: relative;
        display: flex;
        align-items: center;
        gap: 8px;
    `,
};
