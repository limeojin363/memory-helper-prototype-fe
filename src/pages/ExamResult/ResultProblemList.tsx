import styled from "@emotion/styled";
import Text from "../../components/texts/Text";
import { ProblemResultItemType } from "./useResultDetail";
import { Colors } from "../../designs/colors";
import ResultChoice from "./ResultChoice";

type ResultProblemListProps = {
    listData: ProblemResultItemType[];
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
            <Text label={`${problemNumber}. ${question}`} fontStyle="body-lg"/>
            <div>
                <Text label={`내가 낸 답: ${userAnswerView}`} />
                <Text label={`정답: ${rightAnswerView}`} />
            </div>
            <S.ChoicesWrapper>
                {multipleChoice.map(({ id, value }) => (
                    <ResultChoice
                        num={id}
                        value={value}
                        checked={userAnswers.some(
                            (answerItem) => answerItem.id === id,
                        )}
                        focused={rightAnswers.some(
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

        width: 100%;
    `,
    ItemRoot: styled.div`
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
