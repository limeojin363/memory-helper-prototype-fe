import styled from "@emotion/styled";
import Text from "../../components/texts/Text";
import { Colors } from "../../designs/colors";
import ResultChoice from "./ResultChoice";
import { ProblemResult } from "@/apis/services/result/types";

type ResultProblemListProps = {
    listData: ProblemResult[];
};
const ResultProblemItem = ({
    itemData,
}: {
    itemData: ProblemResult;
}) => {
    const {
        multipleChoice,
        rightAnswers,
        userAnswers,
        problemNumber,
        question,
    } = itemData;

    return (
        <S.ItemRoot>
            <Text label={`${problemNumber}. ${question}`} fontStyle="body-lg"/>
            <div>
                <Text label={`내가 낸 답: ${userAnswers.id}`} />
                <Text label={`정답: ${rightAnswers.id}`} />
            </div>
            <S.ChoicesWrapper>
                {multipleChoice.map(({ id, value }) => (
                    <ResultChoice
                        num={Number(id)}
                        value={value}
                        checked={userAnswers.id === id}
                        focused={rightAnswers.id === id}
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
