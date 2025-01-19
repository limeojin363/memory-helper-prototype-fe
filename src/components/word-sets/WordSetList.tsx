import WordSetItem from "./WordSetItem";
import S from "./WordSetList.styled";

const WordSetList = () => {
    return (
        <S.Root>
            <WordSetItem />
            <WordSetItem />
            <WordSetItem />
            <WordSetItem />
        </S.Root>
    );
};

export default WordSetList;
