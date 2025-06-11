import styled from "@emotion/styled";
import Header from "../../../components/layouts/mobile/Header";
import { useNavigate, useRouter } from "@tanstack/react-router";
import TextField from "../../../components/text-field";
import Text from "../../../components/texts/Text";
import useExamDetail from "../hooks/useExamDetail";
import { useEffect, useState } from "react";
import ButtonWithText from "../../../components/button-with-text";
import ResultList from "./ResultList";

const ExamTitle = ({
    propValue,
    examId,
}: {
    propValue: string;
    examId: number;
}) => {
    const [value, setValue] = useState(propValue);

    useEffect(() => {
        // propValue가 변경되면 value를 업데이트
        setValue(propValue);
    }, [setValue, propValue]);

    // TODO: 이거 채우기(API 완성 후)
    const rename = (v: string) => {
        console.log(`시험 제목 변경: ${v} (시험 ID: ${examId})`);
        // 여기에 API 호출 로직을 추가해야 합니다.
        // 예시: ExamApi.renameExam({ examId, newTitle: v });
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const onKeyEnterDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;
        // 값 변화가 없다면 실행 X
        if (value === propValue) return;

        rename(value);
    };

    return (
        <TextField
            value={propValue}
            onChange={onChange}
            onKeyDown={onKeyEnterDown}
            placeholder="시험 제목"
        />
    );
};

const ExamDetailPage = ({ examId }: { examId: number }) => {
    const { history } = useRouter();
    const navigate = useNavigate();

    const examDetailData = useExamDetail(examId);
    if (!examDetailData) return null;

    const howManyProblems = examDetailData.problems.length;
    const sourceWordsetId = examDetailData.sourceWordsetId;
    const sourceWordsetName = examDetailData.sourceWordsetName;
    const 날짜 = examDetailData.createdAt.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

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
                <ExamTitle
                    propValue={examDetailData.examName}
                    examId={examId}
                />
            </Header>
            <S.MetaDataArea>
                <Text
                    label={`문제 수: ${howManyProblems}`}
                    fontStyle="action-md"
                />
                <Text label={날짜} fontStyle="action-md" />
            </S.MetaDataArea>
            <S.ButtonsArea>
                <ButtonWithText
                    text={sourceWordsetName}
                    onClick={goToWordset}
                />
                <ButtonWithText text={"문제 풀기"} onClick={goToSolvingPage} />
            </S.ButtonsArea>
            <ResultList listData={examDetailData.results} />
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
        /* FILL HERE */
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
