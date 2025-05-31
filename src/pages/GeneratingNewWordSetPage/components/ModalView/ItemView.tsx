import styled from "@emotion/styled";
import { ItemData } from "../../hooks/useModalState";
import Text from "../../../../components/texts/Text";
import { TypeKey } from "../../../WordSetDetailPage/components/WordSetList";

const ItemView = ({ status }: { status: ItemData }) => {
    const {
        selectedData: { word, meaning },
    } = status;

    return (
        <S.Root>
            <h1>{word}</h1>
            <ul>
                {meaning.map((item) => (
                    <li key={item.type}>
                        {item.type} {item.value}
                    </li>
                ))}
            </ul>
        </S.Root>
    );
};

export default ItemView;

const EngArea = ({ value }: { value: string }) => {
    return (
        <S.EngAreaWrapper>
            <Text fontStyle="heading-5" label="Eng" />
            <S.EngInputWrapper>
                <S.WordView value={value} />
            </S.EngInputWrapper>
        </S.EngAreaWrapper>
    );
};

const KorArea = ({
    meanings,
}: {
    meanings: {
        type: TypeKey;
        value: string;
    }[];
}) => {
    return (
        <S.KorAreaWrapper>
            <S.KorTopWrapper>
                <Text fontStyle="heading-5" label="Kor" />
            </S.KorTopWrapper>

            {meanings.map((item, idx) => (
                <S.KorMeaningItemWrapper key={idx}>
                    <TypeSelector
                        select={(t) => changeTypeByIdx(idx, t)}
                        value={item.type}
                    />
                    <S.WordView
                        type="text"
                        value={item.value}
                        onChange={(e) =>
                            changeMeaningByIdx(idx, e.target.value)
                        }
                    />
                </S.KorMeaningItemWrapper>
            ))}
        </S.KorAreaWrapper>
    );
};

const S = {
    Root: styled.div``,
    EngAreaWrapper: styled.div``,
    EngValueWrapper: styled.div``,
    KorAreaWrapper: styled.div``,
    KorValuesWrapper: styled.div``,
};
