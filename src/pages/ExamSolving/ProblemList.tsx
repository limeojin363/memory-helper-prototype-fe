import styled from "@emotion/styled";
import { ProblemType } from "../ExamDetail/hooks/useExamDetail";
import Text from "../../components/texts/Text";
import { createContext, useContext } from "react";
import SolvingChoice from "./SolvingChoice";

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
                <Text label={`${problemNumber}. ${question}`} fontStyle="body-lg"/>
                <S.ChoicesWrapper>
                    {multipleChoice.map(({ id, value }) => (
                        <SolvingChoice id={id} value={value} />
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
    ChoicesWrapper: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2px;
    `,
};

export default ProblemList;
