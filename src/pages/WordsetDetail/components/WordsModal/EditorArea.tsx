import styled from "@emotion/styled";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import WordApi from "../../../../apis/services/word";
import { getDataFromApiRes } from "../../../../apis/services";
import WordsetApi from "../../../../apis/services/wordset";
import { AddWordToSetReqParam } from "../../../../apis/services/wordset/add-word-to-wordset/index.types";
import Text, { FontStyleMap } from "../../../../components/texts/Text";
import { Colors } from "../../../../designs/colors";
import Icon from "../../../../components/icons/Icon";
import { ClipLoader } from "react-spinners";
import { queryClient } from "../../../../routes/__root";
import TypeSelector, {
    TypeKey,
} from "../../../../components/type-selector/TypeSelector";
import useWordModalState from "../../hooks/useWordModalState";
import Button1 from "../../../../components/button1";
import ButtonWithText from "../../../../components/button-with-text";
import TextField from "../../../../components/text-field";
import UpdateWordInWordset from "../../../../apis/services/wordset/update-word-in-wordset";
import DeleteWordInWordset from "../../../../apis/services/wordset/delete-word-in-wordset";

export type EditorValues = {
    word: string;
    meanings: {
        type: TypeKey;
        value: string;
    }[];
};

const getEmptyValues = (): EditorValues => ({
    word: "",
    meanings: [],
});

const useEditorState = ({
    initialValues,
    wordsetId,
    wordId,
}: {
    initialValues?: EditorValues;
    wordsetId: number;
    wordId: number | null;
}) => {
    const [state, setState] = useState<EditorValues>(
        initialValues ?? getEmptyValues(),
    );

    const { close: closeModal } = useWordModalState();

    // TODO: 이거 날리는 방향으로 코딩하기
    useEffect(() => {
        setState(initialValues ?? getEmptyValues());
    }, [initialValues]);

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

    const { mutateAsync: createWord } = useMutation({
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
            closeModal();
        },
    });

    const { mutateAsync: updateWord } = useMutation({
        mutationFn: async () => {
            if (!wordsetId || !wordId) return;

            await UpdateWordInWordset({
                setId: wordsetId,
                wordId,
                meaning: state.meanings,
            });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["wordsetDetail", wordsetId],
            });
            closeModal();
        },
    });

    const { mutateAsync: deleteWord } = useMutation({
        mutationFn: async () => {
            if (!wordId) return;

            await DeleteWordInWordset({
                setId: wordsetId,
                wordId: wordId,
            });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["wordsetDetail", wordsetId],
            });

            closeModal();
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

    // TODO: word 꼬인 변수명 정상화
    return {
        state,
        isLoadingMeanings,
        loadServerMeanings,
        addCustomMeaning,
        changeMeaningByIdx,
        changeTypeByIdx,
        deleteMeaningByIdx,
        changeWord,
        createWord: () => createWord(),
        deleteWord: () => deleteWord(),
        updateWord: () => updateWord(),
    };
};

export type WordDetailEditProps = {
    initialValues?: EditorValues;
    mode: "CREATE" | "VIEW" | "MODIFY";
    wordsetId: number; // 단어 세트 ID, CREATE 모드에서만 필요
    wordId: number | null;
};

// 단어 편집 - 새로 생성 or 이미 존재하는 Item을 수정
const WordDetailEdit = ({
    initialValues,
    mode,
    wordsetId,
    wordId,
}: WordDetailEditProps) => {
    const {
        state: { word, meanings },
        isLoadingMeanings,
        loadServerMeanings,
        addCustomMeaning,
        changeMeaningByIdx,
        changeTypeByIdx,
        deleteMeaningByIdx,
        changeWord,
        createWord,
        updateWord,
        deleteWord,
    } = useEditorState({ initialValues, wordsetId, wordId });

    const isEditable = mode !== "VIEW";

    const { selectModeOnExisting } = useWordModalState();

    return (
        <S.Root>
            <S.InputsAreaWrapper>
                <EngArea
                    isEditable={isEditable}
                    isLoadingMeanings={isLoadingMeanings}
                    loadServerMeanings={loadServerMeanings}
                    value={word}
                    onChange={(e) => changeWord(e.target.value)}
                />
                <KorArea
                    isEditable={isEditable}
                    meanings={meanings}
                    changeTypeByIdx={changeTypeByIdx}
                    changeMeaningByIdx={changeMeaningByIdx}
                    deleteMeaningByIdx={deleteMeaningByIdx}
                    addCustomMeaning={addCustomMeaning}
                />
            </S.InputsAreaWrapper>
            {(() => {
                switch (mode) {
                    case "CREATE":
                        return (
                            <ButtonWithText
                                onClick={createWord}
                                text={"생성"}
                            />
                        );
                    case "VIEW":
                        return (
                            <>
                                <ButtonWithText
                                    onClick={deleteWord}
                                    text={"삭제"}
                                />
                                <ButtonWithText
                                    onClick={() =>
                                        selectModeOnExisting("MODIFY")
                                    }
                                    text={"수정"}
                                />
                            </>
                        );
                    case "MODIFY":
                        return (
                            <ButtonWithText
                                onClick={async () => {
                                    await updateWord();
                                }}
                                text={"저장"}
                            />
                        );
                }
            })()}
        </S.Root>
    );
};

const EngArea = ({
    value,
    onChange,
    loadServerMeanings,
    isLoadingMeanings,
    isEditable,
}: {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    loadServerMeanings: () => void;
    isLoadingMeanings: boolean;
    isEditable: boolean;
}) => {
    const showLoadButton = !isLoadingMeanings && !!value && isEditable;

    const inputKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;
        if (!showLoadButton) return;
        loadServerMeanings();
    };

    return (
        <S.EngAreaWrapper>
            <Text fontStyle="heading-5" label="Eng" />
            <S.EngInputWrapper>
                <TextField
                    disabled={!isEditable}
                    onKeyDown={inputKeyDownHandler}
                    onChange={onChange}
                    value={value}
                />
                {showLoadButton && (
                    <S.SideIconPositionor right={4}>
                        <Button1
                            onClick={() => {
                                loadServerMeanings();
                            }}
                            width={"24px"}
                            height={"24px"}
                            activeTransformScale={0.95}
                            colorStyle="Primary"
                            borderRadius={"30%"}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Icon
                                    colorName="highlight-dark"
                                    iconName="submit"
                                    size={12}
                                />
                            </div>
                        </Button1>
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
    isEditable,
}: {
    meanings: {
        type: TypeKey;
        value: string;
    }[];
    changeTypeByIdx: (idx: number, type: TypeKey) => void;
    changeMeaningByIdx: (idx: number, value: string) => void;
    deleteMeaningByIdx: (idx: number) => void;
    addCustomMeaning: () => void;
    isEditable: boolean;
}) => {
    const inputKeyDownHandler =
        (idx: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key !== "Enter") return;

            if (!e.shiftKey) {
                if (meanings.length - 1 === idx) {
                    addCustomMeaning();
                    setTimeout(() => {
                        const NextInput = document.querySelector(
                            `input[data-idx="${idx + 1}"]`,
                        ) as HTMLInputElement | null;
                        NextInput?.focus();
                    });
                } else {
                    const NextInput = document.querySelector(
                        `input[data-idx="${idx + 1}"]`,
                    ) as HTMLInputElement | null;
                    NextInput?.focus();
                }
            } else {
                if (idx === 0) return;
                else {
                    const PrevInput = document.querySelector(
                        `input[data-idx="${idx - 1}"]`,
                    ) as HTMLInputElement | null;
                    PrevInput?.focus();
                }
            }
        };

    const onClickAddCustom = () => {
        addCustomMeaning();
        setTimeout(() => {
            const CreatedInput = document.querySelector(
                `input[data-idx="${meanings.length}"]`,
            ) as HTMLInputElement | null;
            CreatedInput?.focus();
        });
    };

    const showTrashButton = isEditable;

    return (
        <S.KorAreaWrapper>
            <S.KorTopWrapper>
                <Text fontStyle="heading-5" label="Kor" />
                {isEditable && (
                    <Button1
                        onClick={onClickAddCustom}
                        width={"16px"}
                        height={"16px"}
                        activeTransformScale={0.95}
                        colorStyle="Primary"
                        borderRadius={"30%"}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Icon
                                colorName="highlight-dark"
                                iconName="plus"
                                size={10}
                            />
                        </div>
                    </Button1>
                )}
            </S.KorTopWrapper>

            {meanings.map((item, idx) => (
                <S.KorMeaningItemWrapper key={idx}>
                    <TypeSelector
                        disabled={!isEditable}
                        select={(t) => changeTypeByIdx(idx, t)}
                        value={item.type}
                    />
                    <TextField
                        disabled={!isEditable}
                        data-idx={idx}
                        type="text"
                        value={item.value}
                        onKeyDown={inputKeyDownHandler(idx)}
                        onChange={(e) =>
                            changeMeaningByIdx(idx, e.target.value)
                        }
                    />
                    {showTrashButton && (
                        <S.SideIconPositionor right={4}>
                            <Button1
                                onClick={() => deleteMeaningByIdx(idx)}
                                width={"24px"}
                                height={"24px"}
                                activeTransformScale={0.95}
                                colorStyle="Primary"
                                borderRadius={"30%"}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Icon
                                        colorName="highlight-dark"
                                        iconName="trash"
                                        size={20}
                                    />
                                </div>
                            </Button1>
                        </S.SideIconPositionor>
                    )}
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

        width: 100%;

        box-shadow: 0 0 0 1px ${Colors["neutral-light-darkest"]} inset;

        ${FontStyleMap["body-lg"]}
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
    IcButtonWrapper: styled.button<{ size: number }>`
        ${({ size }) => `
            width: ${size}px;
            height: ${size}px;
        `}

        border: none;
        padding: 3px;
        cursor: pointer;
        box-shadow: 0 0 0 2px ${Colors["neutral-dark-darkest"]} inset;

        display: flex;
        align-items: center;
        justify-content: center;

        background-color: ${Colors["neutral-light-darkest"]};

        border-radius: 30%;

        :active {
            transform: scale(0.95);
        }
    `,
    KorMeaningItemWrapper: styled.div`
        position: relative;
        display: flex;
        align-items: center;
        gap: 8px;
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
        border: none;

        box-shadow: 0 0 0 2px ${Colors["neutral-dark-dark"]} inset;
        border-radius: 12px;
        padding: 12px 16px;

        :active {
            transform: scale(0.99);
        }
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
