import styled from "@emotion/styled";
import Text from "../../../components/texts/Text";
import { Colors } from "../../../designs/colors";
import { useNavigate } from "@tanstack/react-router";

export type ResultItem = {
    resultId: number;
    createdAt: string;
    totalProblemsNum: number;
    correctedAnswersNum: number;
};

const ResultItem = ({ data }: { data: ResultItem }) => {
    const { correctedAnswersNum, createdAt, resultId, totalProblemsNum } = data;

    const navigate = useNavigate();
    const onClick = () =>
        navigate({
            to: "/result/$resultId",
            params: { resultId: String(resultId) },
        });

    return (
        <S.ItemRoot onClick={onClick}>
            <Text label={`생성 날짜: ${createdAt}`} />
            <Text label={`문제 수: ${totalProblemsNum}`} />
            <Text label={`정답 수: ${correctedAnswersNum}`} />
        </S.ItemRoot>
    );
};

// Pure
const ResultList = ({
    data,
}: {
    data:
        | {
              resultId: number;
              createdAt: string;
              totalProblemsNum: number;
              correctedAnswersNum: number;
          }[]
        | null;
}) => {
    const hasResults = data !== null && data.length > 0;

    return (
        <S.Root>
            <Text label="시험 결과 목록" fontStyle="heading-2" />
            {hasResults ? (
                <S.List>
                    {data.map((item) => (
                        <ResultItem key={item.resultId} data={item} />
                    ))}
                </S.List>
            ) : (
                <Text label="아직 시험을 본 기록이 없어요." />
            )}
        </S.Root>
    );
};

const S = {
    Root: styled.div`
        width: calc(100% - 30px);
        padding: 15px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 8px;
    `,
    List: styled.div``,
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
