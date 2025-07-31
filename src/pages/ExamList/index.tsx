import ProblemSetList from "./ProblemSetList";
import S from "./ProblemsMain.styled";
import useExamList from "./useExamList";

const ExamListPage = () => {
    const examList = useExamList();
    console.log(examList);

    return (
        <S.MiddleArea>
            <ProblemSetList />
        </S.MiddleArea>
    );
};

export default ExamListPage;
