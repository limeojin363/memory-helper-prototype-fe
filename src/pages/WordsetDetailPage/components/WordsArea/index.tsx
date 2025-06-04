import Icon from "../../../../components/icons/Icon";
import { Colors } from "../../../../designs/colors";
import styled from "@emotion/styled";
import useWordModalState from "../../hooks/useWordModalState";
import Button1 from "../../../../components/button1";

export type WordItemProps = {
    id: number;
    eng: string;
    firstMeaning: string;
    meaningCount: number;
};

const OpenCreateModal = () => {
    const { openCreateMode } = useWordModalState();

    return (
        <Button1 height={"40px"} onClick={openCreateMode}>
            <Icon colorName="neutral-dark-darkest" iconName="plus" size={20} />
        </Button1>
    );
};

// Pure
const WordItem = ({ id, eng, firstMeaning, meaningCount }: WordItemProps) => {
    const mainText = eng;
    const sideText = `"${firstMeaning}" 등 ${meaningCount}개 의미`;

    const { select } = useWordModalState();

    return (
        <Button1 height={"40px"} onClick={() => select(id)}>
            <S.ItemInner>
                <div>{mainText}</div>
                <div>{sideText}</div>
            </S.ItemInner>
        </Button1>
    );
};

// Pure
const WordsArea = ({ listData }: { listData: WordItemProps[] }) => {
    return (
        <S.ListContainer>
            {listData.map((item) => (
                <WordItem {...item} />
            ))}
            <OpenCreateModal />
        </S.ListContainer>
    );
};

export default WordsArea;

const S = {
    ListContainer: styled.div`
        width: calc(100% - 80px);
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
