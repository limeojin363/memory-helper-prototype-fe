import styled from "@emotion/styled";
import Text from "../../../components/texts/Text";
import { Colors } from "../../../designs/colors";
import { useNavigate } from "@tanstack/react-router";

export type ResultItem = {
    resultId: number;
    date: string;
    totalProblemsNum: number;
    correctedAnswersNum: number;
};

type ResultListProps = {
    listData: ResultItem[];
};

const ResultItem = ({ itemData }: { itemData: ResultItem }) => {
    const { correctedAnswersNum, date, resultId, totalProblemsNum } = itemData;

    const navigate = useNavigate();
    const onClick = () =>
        navigate({
            to: "/result/$resultId",
            params: { resultId: String(resultId) },
        });

    return (
        <S.ItemRoot onClick={onClick}>
            <Text label={`공부한 날짜: ${date}`} />
            <Text label={`문제 수: ${totalProblemsNum}`} />
            <Text label={`정답 수: ${correctedAnswersNum}`} />
        </S.ItemRoot>
    );
};

// Pure
const ResultList = ({ examId }: { examId: number }) => {
    return (
        <S.ListRoot>
            <Text label="시험 결과" fontStyle="heading-2" />
        </S.ListRoot>
    );
};

const S = {
    ListRoot: styled.div`
        width: calc(100% - 30px);
        padding: 15px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 8px;
    `,
    ItemRoot: styled.div`
        width: calc(100% - 16px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2px;
        padding: 4px 8px;

        box-shadow: 0 0 0 1.4px ${Colors["neutral-dark-darkest"]} inset;

        :active {
            transform: scale(0.98);
        }
    `,
};

export default ResultList;
