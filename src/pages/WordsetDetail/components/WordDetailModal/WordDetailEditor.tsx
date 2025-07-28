import styled from "@emotion/styled";
import { createContext, useContext, useEffect, useState } from "react";
import { FontStyleMap } from "../../../../components/texts/Text";
import { Colors } from "../../../../designs/colors";
import { TypeKey } from "../../../../components/type-selector/TypeSelector";
import EngArea from "./EngArea";
import KorArea from "./KorArea";
import WordDetailModal from ".";
import ButtonsArea from "./ButtonsArea";

export type EditorValues = {
    engWord: string;
    korMeanings: {
        type: TypeKey;
        value: string;
    }[];
};

const getEmptyValues = (): EditorValues => ({
    engWord: "",
    korMeanings: [],
});

// 각 필드들에 대한 입력 정보의 관리, 서버 요청 리스너
const useEditorState = () => {
    const { initialValues } = WordDetailModal.useModalContext();

    const [{ engWord, korMeanings }, setState] = useState<EditorValues>(
        initialValues ?? getEmptyValues(),
    );

    // TODO: 이거 날리는 방향으로 코딩하기
    useEffect(() => {
        setState(initialValues ?? getEmptyValues());
    }, [initialValues]);

    const addCustomMeaning = () =>
        setState((prev) => ({
            ...prev,
            korMeanings: [
                ...prev.korMeanings,
                {
                    type: "noun",
                    value: "",
                },
            ],
        }));

    const addLoadedMeanings = (meanings: {
        type: TypeKey;
        value: string;
    }[]) => {
        setState((prev) => ({
            ...prev,
            korMeanings: [...prev.korMeanings, ...meanings],
        }));
    }

    const changeMeaningByIdx = (idx: number, value: string) =>
        setState((prev) => ({
            ...prev,
            korMeanings: prev.korMeanings.map((item, i) =>
                i === idx ? { ...item, value } : item,
            ),
        }));

    const changeTypeByIdx = (idx: number, type: TypeKey) =>
        setState((prev) => ({
            ...prev,
            korMeanings: prev.korMeanings.map((item, i) =>
                i === idx ? { ...item, type } : item,
            ),
        }));

    const deleteMeaningByIdx = (idx: number) =>
        setState((prev) => ({
            ...prev,
            korMeanings: prev.korMeanings.filter((_, i) => i !== idx),
        }));

    const changeWord = (word: string) =>
        setState((prev) => ({
            ...prev,
            engWord: word,
        }));

    // TODO: word 꼬인 변수명 정상화
    return {
        engWord,
        korMeanings,
        addCustomMeaning,
        addLoadedMeanings,
        changeMeaningByIdx,
        changeTypeByIdx,
        deleteMeaningByIdx,
        changeWord,
    };
};

const EditorContext = createContext<ReturnType<typeof useEditorState>>({
    engWord: "",
    korMeanings: [],
    addCustomMeaning: () => {},
    addLoadedMeanings: () => {},
    changeMeaningByIdx: () => {},
    changeTypeByIdx: () => {},
    deleteMeaningByIdx: () => {},
    changeWord: () => {},
});

const useEditorContext = () => useContext(EditorContext);

const EditorStatesProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <EditorContext.Provider value={useEditorState()}>
            {children}
        </EditorContext.Provider>
    );
};

// 단어 편집 - 새로 생성 or 이미 존재하는 Item을 수정
const WordDetailEditor = () => {
    return (
        <S.Root>
            <EditorStatesProvider>
                <S.InputsAreaWrapper>
                    <EngArea />
                    <KorArea />
                </S.InputsAreaWrapper>
                <ButtonsArea />
            </EditorStatesProvider>
        </S.Root>
    );
};

WordDetailEditor.useEditorContext = useEditorContext;

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
