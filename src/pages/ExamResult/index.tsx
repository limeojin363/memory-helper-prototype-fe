import styled from "@emotion/styled";
import useResultDetail from "./useResultDetail";
import { useNavigate, useRouter } from "@tanstack/react-router";
import Header from "../../components/layouts/mobile/Header";
import Text from "../../components/texts/Text";
import ResultProblemList from "./ResultProblemList";

type ExamResultPageProps = { resultId: number };

const ExamResultPage = ({ resultId }: ExamResultPageProps) => {
    const resultDetail = useResultDetail(resultId);
    const { history } = useRouter();
    const navigate = useNavigate();

    if (!resultDetail) return null;

    const { createdAt, problemResultList, examName, examId } = resultDetail;

    const goBack = () => history.go(-1);
    const goToExam = () =>
        navigate({
            to: "/exam/$examId",
            params: {
                examId: examId.toString(),
            },
        });
    const dateView = createdAt.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    return (
        <S.PageRoot>
            <Header goBack={goBack}>
                <Text label={`${examName} - ${dateView}`} />
            </Header>
            <S.ContentsWrapper>
                <Text label={examName} onClick={goToExam} />
                <ResultProblemList listData={problemResultList} />
            </S.ContentsWrapper>
        </S.PageRoot>
    );
};

const S = {
    PageRoot: styled.div`
        width: 100%;
    `,
    ContentsWrapper: styled.div`
        width: calc(100% - 40px);
        padding: 8px 20px;
    `,
};

export default ExamResultPage;
