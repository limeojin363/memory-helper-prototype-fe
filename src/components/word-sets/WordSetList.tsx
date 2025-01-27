import WordSetItem from "./WordSetItem";
import S from "./WordSetList.styled";
import { useState } from "react";
import _ from "lodash";

export const useWordSetState = () => {
    const [wordSetsData, setWordSetsData] = useState([
        { name: "3", createdAt: new Date(), problemSetCount: 1, id: "1" },
        { name: "34", createdAt: new Date(), problemSetCount: 4, id: "2" },
        { name: "534", createdAt: new Date(), problemSetCount: 4, id: "3" },
    ]);

    const swap = (dragIndex: number, hoverIndex: number) => {
        setWordSetsData((prevData) => {
            const nextData = [...prevData];
            
            const temp = nextData[dragIndex]
            

            return nextData;
        });
    };

    return {
        wordSetsData,
    };
};

const WordSetList = () => {
    const { wordSetsData } = useWordSetState();

    return (
        <S.Root>
            {wordSetsData.map((wordSet, index) => (
                <WordSetItem
                    id={wordSet.id}
                    key={index}
                    name={wordSet.name}
                    createdAt={wordSet.createdAt}
                    problemSetCount={wordSet.problemSetCount}
                />
            ))}
        </S.Root>
    );
};

export default WordSetList;
