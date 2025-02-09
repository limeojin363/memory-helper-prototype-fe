import useInput from "../../../hooks/useInput";
import SearchBar from "../../general/layouts/mobile/SearchBar";
import ProblemSetList from "./ProblemSetList";
import S from "./ProblemsMain.styled";

const ProblemsMain = () => {
    const [value, onChange] = useInput();

    return (
        <S.MiddleArea>
            <SearchBar value={value} onChange={onChange} />
            <ProblemSetList />
        </S.MiddleArea>
    );
};

export default ProblemsMain;
