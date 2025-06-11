import styled from "@emotion/styled";
import { ProblemType } from "../ExamDetail/hooks/useExamDetail";
import { useExamId } from ".";
import useChoices from "./useChoice";
import Text from "../../components/texts/Text";
import { Colors } from "../../designs/colors";

const Choice = ({
    selected,
    onClick,
    id,
    value,
}: {
    selected: boolean;
    onClick: React.MouseEventHandler;
    id: string;
    value: string;
}) => {
    return (
        <S.ChoiceRoot onClick={onClick}>
            <S.ChoiceIdWrapper selected={selected}>
                <Text label={id} />
            </S.ChoiceIdWrapper>
            <Text label={value} />
        </S.ChoiceRoot>
    );
};

const ProblemItem = ({ itemData }: { itemData: ProblemType }) => {
    const examId = useExamId();
    const problemId = itemData.problemNumber;

    const { isSelected, toggleChoice } = useChoices(examId, problemId);

    return (
        <S.ItemRoot>
            <Text label={`${itemData.problemNumber}. ${itemData.question}`} />
            {itemData.multipleChoice.map(({ id, value }) => (
                <Choice
                    selected={isSelected(id)}
                    id={id}
                    onClick={() => toggleChoice(id)}
                    value={value}
                />
            ))}
        </S.ItemRoot>
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
    `,
    ChoiceRoot: styled.div`
        display: flex;
        align-items: center;
        gap: 8px;
    `,
    ChoiceIdWrapper: styled.button<{ selected: boolean }>`
        display: flex;
        justify-content: center;
        align-items: center;

        border: 1px solid ${Colors["highlight-dark"]};
        height: 16px;
        width: 16px;
        border-radius: 50%;

        background-color: ${({selected}) =>
            selected ? Colors["highlight-dark"] : "transparent"};
    `,
};

export default ProblemList;
