import ExamListComponent from "./ExamListComponent";
import useExamList from "./useExamList";
import styled from "@emotion/styled";

const ExamListPage = () => {
    const examList = useExamList();

    return (
        <S.MiddleArea>
            <ExamListComponent data={examList} />
        </S.MiddleArea>
    );
};

export default ExamListPage;

const S = {
    MiddleArea: styled.div`
        display: flex;
        flex-direction: column;
        gap: 16px;

        width: calc(100% - 32px);
        margin: 20px 16px 0;
    `,
};
