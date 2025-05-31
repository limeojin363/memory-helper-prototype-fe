import { Colors } from "../../../../designs/colors";
import { useModalState } from "../../hooks/useModalState";
import styled from "@emotion/styled";

export type WordItemProps = {
    id: number;
    eng: string;
    firstMeaning: string;
    meaningCount: number;
};
const OpenCreateModal = () => {
    const { openCreateMode } = useModalState();

    return <S.ItemWrapper onClick={openCreateMode}>+</S.ItemWrapper>;
};

const WordItem = ({ id, eng, firstMeaning, meaningCount }: WordItemProps) => {
    const mainText = eng;
    const sideText = `"${firstMeaning}" 등 ${meaningCount}개 의미`;

    const { select } = useModalState();

    return (
        <S.ItemWrapper onClick={() => select(id)}>
            <S.ItemInner>
                <div>{mainText}</div>
                <div>{sideText}</div>
            </S.ItemInner>
        </S.ItemWrapper>
    );
};

const List = ({ listData }: { listData: WordItemProps[] }) => {
    return (
        <S.ListContainer>
            {listData.map((item) => (
                <WordItem {...item} />
            ))}
            <OpenCreateModal />
        </S.ListContainer>
    );
};

export default List;

const S = {
    ListContainer: styled.div`
        width: calc(100% - 20px);
        padding: 10px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
        gap: 8px;
    `,
    ItemWrapper: styled.div`
        height: 40px;

        background-color: ${Colors["neutral-light-medium"]};
        box-shadow: 0 0 0 2px ${Colors["neutral-dark-dark"]} inset;
        border-radius: 12px;

                display: flex;
        justify-content: center;
        align-items: center;


        :active {
            transform: scale(0.99);
        }
    `,
    ItemInner: styled.div`
        flex: 1;
        padding: 0 12px;

        display: flex;
        justify-content: space-between;
        align-items: center;
    `,
    EngAreaWrapper: styled.div`
        position: relative;

        display: flex;
        flex-direction: column;
        gap: 8px;
    `,
    KorAreaWrapper: styled.div`
        flex: 1;

        display: flex;
        flex-direction: column;
        gap: 8px;
    `,
    KorTopWrapper: styled.div`
        display: flex;
        justify-content: space-between;
    `,
    WordView: styled.div`
        flex: 1;
        all: unset;
        border-radius: 12px;
        padding: 12px 16px;
        transition: all 0.1s;

        width: 100%;

        box-shadow: 0 0 0 1px ${Colors["neutral-light-darkest"]} inset;
    `,
};
