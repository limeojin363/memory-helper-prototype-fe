import styled from "@emotion/styled";
import Header from "../../../components/layouts/mobile/Header";
import { useNavigate, useRouter } from "@tanstack/react-router";
import Text from "../../../components/texts/Text";
import useExamDetail from "../hooks/useExamDetail";
import ButtonWithText from "../../../components/button-with-text";
import ResultList from "./ResultList";
import EditableTitle from "@/components/editable-title";

const ExamDetailPage = ({ examId }: { examId: number }) => {
    const { history } = useRouter();
    const navigate = useNavigate();

    const examDetailData = useExamDetail(examId);
    if (!examDetailData) return null;

    const howManyProblems = examDetailData.problemResultList.length;
    const sourceWordsetId = examDetailData.sourceWordSetId;
    const sourceWordsetName = examDetailData.sourceWordSetName;
    const dateView = new Date(examDetailData.createdAt).toLocaleDateString(
        "ko-KR",
        {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        },
    );

    const goBack = () => history.go(-1);
    const goToWordset = () =>
        navigate({
            to: "/wordset/$wordsetId",
            params: { wordsetId: String(sourceWordsetId) },
        });
    const goToSolvingPage = () =>
        navigate({
            to: "/exam/$examId/solve",
            params: { examId: String(examId) },
        });

    return (
        <S.Root>
            <Header goBack={goBack}>
                <EditableTitle
                    initialValue={examDetailData.examName}
                    renameRequest={() => {}}
                />
            </Header>
            <S.MetaDataArea>
                <Text
                    label={`문제 수: ${howManyProblems}`}
                    fontStyle="action-md"
                />
                <Text label={dateView} fontStyle="action-md" />
            </S.MetaDataArea>
            <S.ButtonsArea>
                <ButtonWithText
                    text={sourceWordsetName}
                    onClick={goToWordset}
                />
                <ButtonWithText text={"문제 풀기"} onClick={goToSolvingPage} />
            </S.ButtonsArea>
            <ResultList examId={examId} />
        </S.Root>
    );
};

export default ExamDetailPage;

const S = {
    Root: styled.div`
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
    `,
    MetaDataArea: styled.div`
        width: calc(100% - 40px);
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
    `,
    ButtonsArea: styled.div`
        display: flex;
        width: calc(100% - 40px);
        gap: 16px;
    `,
};
