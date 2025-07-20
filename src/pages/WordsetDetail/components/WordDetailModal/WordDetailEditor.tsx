import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import WordApi from "../../../../apis/services/word";
import { getDataFromApiRes } from "../../../../apis/services";
import WordsetApi from "../../../../apis/services/wordset";
import { AddWordToSetReqParam } from "../../../../apis/services/wordset/add-word-to-wordset/index.types";
import { FontStyleMap } from "../../../../components/texts/Text";
import { Colors } from "../../../../designs/colors";
import { queryClient } from "../../../../routes/__root";
import {
    TypeKey,
} from "../../../../components/type-selector/TypeSelector";
import useWordModalState from "../../hooks/useWordModalState";
import ButtonWithText from "../../../../components/button-with-text";
import UpdateWordInWordset from "../../../../apis/services/wordset/update-word-in-wordset";
import DeleteWordInWordset from "../../../../apis/services/wordset/delete-word-in-wordset";
import EngArea from "./EngArea";
import KorArea from "./KorArea";

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

// 각 필드들에 대한 입력 정보의 관리, 서버 요청 리스너
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
const WordDetailEditor = ({
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
            {/* TODO: "ButtonsArea"로 리팩토링 */}
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


export default WordDetailEditor;

const S = {
    Root: styled.div`
        flex: 1;

        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 16px;
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
