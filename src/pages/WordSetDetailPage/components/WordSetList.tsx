import S from "./styled";
import Text from "../../../components/texts/Text";

export const TypeMap = {
    noun: "명",
    verb: "동",
    adjective: "형",
    adverb: "부",
} as const;

export type TypeKey = keyof typeof TypeMap;

export type ComponentViewDataItem = {
    engWord: string;
    korWords: {
        value: string;
        type: TypeKey;
    }[];
};

const WordItem = ({ data }: { data: ComponentViewDataItem }) => {
    return (
        <S.ItemContainer>
            <S.EngAreaContainer>
                <Text label={"Eng"} fontStyle="body-xl" />
                <Text label={data.engWord} fontStyle="body-xl" />
            </S.EngAreaContainer>
            <S.KorAreaContainer>
                <Text label={"Kor"} fontStyle="body-xl" />
                <S.KorItemList>
                    {data.korWords.map((korWordItem, index) => (
                        <Text
                            key={index}
                            label={`${korWordItem.value}`}
                            fontStyle="body-xl"
                        />
                    ))}
                </S.KorItemList>
            </S.KorAreaContainer>
        </S.ItemContainer>
    );
};

const WordList = ({ list }: { list: ComponentViewDataItem[] }) => {
    return (
        <S.ListContainer>
            {list.map((data, index) => (
                <WordItem key={index} data={data} />
            ))}
        </S.ListContainer>
    );
};

export default WordList;
