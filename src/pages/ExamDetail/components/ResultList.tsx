import styled from "@emotion/styled";
import Text from "../../../components/texts/Text";

export type ResultItem = {
    resultId: number;
    date: string;
    totalProblemsNum: number;
    correctedAnswersNum: number;
};

type ResultListProps = {
    listData: ResultItem[];
};

// Pure
const ResultList = ({ listData }: ResultListProps) => {
    return (
        <S.Root>
            <Text label="시험 결과" fontStyle="action-md" />
            {listData.map((item) => (
                <div key={item.resultId}>
                    <p>공부한 날짜: {item.date}</p>
                    <p>문제 수: {item.totalProblemsNum}</p>
                    <p>정답 수: {item.correctedAnswersNum}</p>
                </div>
            ))}
        </S.Root>
    );
};

const S = {
    Root: styled.div`
        /* FILL HERE */
    `,
};

export default ResultList;
