import styled from "@emotion/styled";
import { ProblemType } from "../ExamDetail/hooks/useExamDetail";
import useChoices from "./useChoice";
import Text from "../../components/texts/Text";
import { Colors } from "../../designs/colors";
import { createContext, useContext } from "react";

const Choice = ({ id, value }: { id: string; value: string }) => {
    const { isSelected, toggleChoice } = useChoices();

    return (
        <S.ChoiceRoot onClick={() => toggleChoice(id)}>
            <S.ChoiceIdWrapper selected={isSelected(id)}>
                <Text label={id} />
            </S.ChoiceIdWrapper>
            <Text label={value} />
        </S.ChoiceRoot>
    );
};

const ProblemItemContext = createContext<{ problemId: number }>({
    problemId: 0,
});

export const useProblemId = () => {
    const { problemId } = useContext(ProblemItemContext);

    return problemId;
};

const ProblemItem = ({ itemData }: { itemData: ProblemType }) => {
    const { multipleChoice, problemId, question, problemNumber } = itemData;

    return (
        <ProblemItemContext.Provider value={{ problemId }}>
            <S.ItemRoot>
                <Text label={`${problemNumber}. ${question}`} />
                <S.ChoicesWrapper>
                    {multipleChoice.map(({ id, value }) => (
                        <Choice id={id} value={value} />
                    ))}
                </S.ChoicesWrapper>
            </S.ItemRoot>
        </ProblemItemContext.Provider>
    );
};

const ProblemList = ({ listData }: { listData: ProblemType[] }) => {
    return (
        <S.ListRoot>
            {listData.map((item) => (
                <ProblemItem key={item.problemNumber} itemData={item} />
            ))}
        </S.ListRoot>
    );
};

const S = {
    ListRoot: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 24px;
    `,
    ItemRoot: styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 8px;
    `,
    ChoiceRoot: styled.div`
        display: flex;
        align-items: center;
        gap: 8px;
    `,
    ChoicesWrapper: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2px;
    `,
    ChoiceIdWrapper: styled.button<{ selected: boolean }>`
        display: flex;
        justify-content: center;
        align-items: center;

        border: 1px solid ${Colors["highlight-dark"]};
        height: 16px;
        width: 16px;
        border-radius: 50%;

        background-color: ${({ selected }) =>
            selected ? Colors["highlight-dark"] : "transparent"};
    `,
};

export default ProblemList;
