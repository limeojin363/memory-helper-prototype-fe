import useInput from "../../hooks/useInput";
import SearchBar from "../../components/layouts/mobile/SearchBar";
import ProblemSetList from "./ProblemSetList";
import S from "./ProblemsMain.styled";

const ExamListPage = () => {
    const [value, onChange] = useInput();

    return (
        <S.MiddleArea>
            <SearchBar value={value} onChange={onChange} />
            <ProblemSetList />
        </S.MiddleArea>
    );
};

export default ExamListPage;
