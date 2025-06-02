import WordSetItem from "./WordSetItem";
import S from "./WordSetList.styled";
import useWordSetListData from "../hooks/useWordSetListData";

const WordSetList = () => {
    const data = useWordSetListData();

    return (
        <S.Root>
            {data?.map(({ createdAt, setId, setName, testSetsCount }) => (
                <WordSetItem
                    id={String(setId)}
                    key={setId}
                    name={setName}
                    createdAt={new Date(createdAt)}
                    problemSetCount={testSetsCount}
                />
            ))}
        </S.Root>
    );
};

export default WordSetList;
