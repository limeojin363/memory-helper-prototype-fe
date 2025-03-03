import React from "react";
import S from "./styled";
import Text from "../../../components/texts/Text";

export type ComponentViewDataItem = {
    engWord: string;
    korWords: {
        word: string;
        type: "noun" | "verb" | "adjective" | "adverb";
    }[];
};

const NounViewMap = {
    noun: "명",
    verb: "동",
    adjective: "형",
    adverb: "부",
};

const WordSetItem = ({ data }: { data: ComponentViewDataItem }) => {
    return (
        <S.ItemContainer>
            <S.EngAreaContainer>
                <Text label={"Eng"} fontStyle="body-xl" />
                <Text label={data.engWord} fontStyle="body-xl" />
            </S.EngAreaContainer>
            <S.KorAreaContainer>
                <Text label={"Kor"} fontStyle="body-xl" />
                <S.KorItemList>
                    {data.korWords.map((korWord, index) => (
                        <Text
                            key={index}
                            label={`(${NounViewMap[korWord.type]}) ${korWord.word}`}
                            fontStyle="body-xl"
                        />
                    ))}
                </S.KorItemList>
            </S.KorAreaContainer>
        </S.ItemContainer>
    );
};

const WordSetList = ({ list }: { list: ComponentViewDataItem[] }) => {
    return (
        <S.ListContainer>
            {list.map((data, index) => (
                <WordSetItem key={index} data={data} />
            ))}
        </S.ListContainer>
    );
};

export default WordSetList;
