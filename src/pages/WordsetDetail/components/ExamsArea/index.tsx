import styled from "@emotion/styled";
import useCreateExam from "../../hooks/useCreateExam";
import Button1 from "../../../../components/button1";
import Icon from "../../../../components/icons/Icon";
import { useQuery } from "@tanstack/react-query";
import ExamApi from "@/apis/services/exam";
import { getDataFromApiRes } from "@/apis/services";
import WordsetDetailPage from "..";
import ExamItem from "@/pages/ExamList/ExamItem";
import { Colors } from "@/designs/colors";

const useExamOfWordsetList = (wordsetId: number) => {
    const { data } = useQuery({
        queryKey: ["examOfWordsetList", wordsetId],
        queryFn: async () => {
            const res = ExamApi.GetExams({ setId: wordsetId });
            const data = getDataFromApiRes(res);
            return data;
        },
        initialData: null,
    });

    if (data === null) return null;

    return data.content;
};

const ExamsArea = () => {
    const wordsetId = WordsetDetailPage.useWordsetId();
    const createExam = useCreateExam(wordsetId);
    const exams = useExamOfWordsetList(wordsetId);

    return (
        <S.Root>
            <S.List>
                {exams && (
                    <>
                        <S.Separator />
                        {exams.map((exam) => (
                            <ExamItem
                                id={String(exam.examId)}
                                key={exam.examId}
                                name={exam.examName}
                                generatedAt={new Date(exam.generatedAt)}
                                basedOn={"exam.basedWordsetName"}
                                howManyTimesStudied={exam.timesStudied}
                                recentStudiedAt={
                                    new Date(exam.recentStudiedAt ?? Date.now())
                                }
                                problemNumber={exam.problemCount}
                            />
                        ))}
                    </>
                )}
            </S.List>
                        <S.Separator />
            <Button1
                height={"40px"}
                width={"calc(100% - 40px)"}
                onClick={() => createExam()}
                colorStyle="Neutral"
            >
                <Icon
                    colorName="neutral-dark-darkest"
                    iconName="plus"
                    size={20}
                />
            </Button1>
        </S.Root>
    );
};

export default ExamsArea;

const S = {
    Root: styled.div`
        width: calc(100% - 40px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 8px;
    `,
    List: styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
        width: 100%;
        gap: 8px;
    `,
    Separator: styled.div`
        width: 100%;
        height: 1.8px;
        background-color: ${Colors["neutral-dark-darkest"]};
    `,
};
