import { GetExamsResData } from "@/apis/services/exam/get-exam-list/index.types";
import ExamItem from "./ExamItem";
import styled from "@emotion/styled";

const ExamListComponent = ({ data }: { data?: GetExamsResData }) => {
    return (
        <S.Root>
            {data?.content.map((exam) => (
                <ExamItem
                    id={String(exam.examId)}
                    key={exam.examId}
                    name={exam.examName}
                    generatedAt={new Date(exam.generatedAt)}
                    basedOn={"exam.basedWordsetName"}
                    howManyTimesStudied={exam.timesStudied}
                    recentStudiedAt={new Date(exam.recentStudiedAt ?? Date.now())}
                    problemNumber={exam.problemCount}
                />
            ))}
        </S.Root>
    );
};

const S = {
    Root: styled.div`
        position: relative;

        display: flex;
        flex-direction: column;
        gap: 8px;
    `,
};

export default ExamListComponent;
