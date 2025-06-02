import Icon from "../../../../components/icons/Icon";
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

    return (
        <S.ItemWrapper onClick={openCreateMode}>
            {/* TODO: + 아이콘으로 대체 */}
            <Icon colorName="neutral-dark-darkest" iconName="plus" size={20} />
        </S.ItemWrapper>
    );
};

// Pure
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

// Pure
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
        gap: 8px;
    `,
    ItemWrapper: styled.button`
        height: 40px;

        background-color: ${Colors["neutral-light-dark"]};

        border: none;
        box-shadow: 0 0 0 2px ${Colors["neutral-dark-medium"]} inset;
        border-radius: 12px;

        display: flex;
        justify-content: center;
        align-items: center;

        :active {
            transform: scale(0.99);
        }
        :focus {
            outline: none;
        }
        :focus-visible {
            box-shadow: 0 0 0 3px ${Colors["neutral-dark-darkest"]} inset;
        }
    `,
    ItemInner: styled.div`
        flex: 1;
        padding: 0 12px;

        display: flex;
        justify-content: space-between;
        align-items: center;
    `,
};
