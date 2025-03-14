import { Link } from "@tanstack/react-router";
import SearchBar from "../../../components/layouts/mobile/SearchBar";
import WordSetList from "./WordSetList";
import S from "./WordsMain.styled";
import useInput from "../../../hooks/useInput";
import Icon from "../../../components/icons/Icon";

const WordsMain = () => {
    const [value, onChange] = useInput();

    return (
        <>
            <S.MiddleArea>
                <SearchBar value={value} onChange={onChange} />
                <WordSetList />
            </S.MiddleArea>
            <Link to="/words/new">
                <S.AddButton>
                    <Icon
                        iconName="plus"
                        size={28}
                        colorName="highlight-lightest"
                    />
                </S.AddButton>
            </Link>
        </>
    );
};

export default WordsMain;
