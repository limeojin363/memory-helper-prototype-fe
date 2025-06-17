import styled from "@emotion/styled";
import Text from "../../components/texts/Text";

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
        rightAnswers: rightAnswer,
        userAnswers: userAnswer,
        problemNumber,
        question,
    } = itemData;

    // const userAnswerView = userAnswer.map(answer => answer.);
    const rightAnswerView = rightAnswer.join();

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
                        selected={userAnswer.includes(id)}
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
        align-items: center;
        gap: 8px;
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
