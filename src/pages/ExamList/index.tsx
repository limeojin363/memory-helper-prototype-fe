import useInput from "../../hooks/useInput";
import SearchBar from "../../components/layouts/mobile/SearchBar";
import ProblemSetList from "./ProblemSetList";
import S from "./ProblemsMain.styled";
import useExamList from "./useExamList";

const ExamListPage = () => {
    const [value, onChange] = useInput();

    const examList = useExamList();
    console.log(examList);

    return (
        <S.MiddleArea>
            <SearchBar value={value} onChange={onChange} />
            <ProblemSetList />
        </S.MiddleArea>
    );
};

export default ExamListPage;
