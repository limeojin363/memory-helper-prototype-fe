import styled from "@emotion/styled";
import Text from "../../components/texts/Text";
import { ProblemResultItemType } from "./useResultDetail";
import { Colors } from "../../designs/colors";

type ResultProblemListProps = {
    listData: ProblemResultItemType[];
};

const Choice = ({
    id,
    value,
    selected,
}: {
    id: number;
    value: string;
    selected: boolean;
}) => {
    return (
        <S.ChoiceRoot>
            <S.ChoiceIdWrapper selected={selected}>
                <Text label={String(id)} />
            </S.ChoiceIdWrapper>
            <Text label={value} />
        </S.ChoiceRoot>
    );
};

const ResultProblemItem = ({
    itemData,
}: {
    itemData: ProblemResultItemType;
}) => {
    const {
        multipleChoice,
        rightAnswers,
        userAnswers,
        problemNumber,
        question,
    } = itemData;

    const userAnswerView = userAnswers.map((answer) => answer.value).join(", ");
    const rightAnswerView = rightAnswers
        .map((answer) => answer.value)
        .join(", ");

    return (
        <S.ItemRoot>
            <Text label={`${problemNumber}. ${question}`} />
            <Text label={`내가 낸 답: ${userAnswerView}`} />
            <Text label={`정답: ${rightAnswerView}`} />
            <S.ChoicesWrapper>
                {multipleChoice.map(({ id, value }) => (
                    <Choice
                        id={id}
                        value={value}
                        selected={userAnswers.some(
                            (answerItem) => answerItem.id === id,
                        )}
                    />
                ))}
            </S.ChoicesWrapper>
        </S.ItemRoot>
    );
};

const ResultProblemList = ({ listData }: ResultProblemListProps) => {
    return (
        <S.ListRoot>
            {listData.map((item) => (
                <ResultProblemItem itemData={item} />
            ))}
        </S.ListRoot>
    );
};

const S = {
    ListRoot: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 8px;

        width: calc(100% - 40px);
        padding: 0 20px;
    `,
    ItemRoot: styled.div``,
    ChoicesWrapper: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2px;
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

        background-color: ${({ selected }) =>
            selected ? Colors["highlight-dark"] : "transparent"};
    `,
};

export default ResultProblemList;
