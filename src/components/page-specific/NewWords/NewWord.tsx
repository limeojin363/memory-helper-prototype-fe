import { usePairList } from "./useNewWordSetState";
import { useNavigate } from "@tanstack/react-router";
import styled from "@emotion/styled";
import Header from "../../general/layouts/mobile/Header";
import Icon from "../../general/icons/Icon";
import WordInputPairItem from "./WordInputPairItem";

const NewWord = () => {
    const navigate = useNavigate();

    const goBack = () => navigate({ to: "/words" });

    const { pairList, addPairItem } = usePairList();

    return (
        <>
            <Header title="New Word Set Generating" goBack={goBack} />
            <S.Root>
                {pairList.map(({ pairId }) => (
                    <WordInputPairItem pairId={pairId} key={pairId} />
                ))}
                <Icon
                    colorName="neutral-dark-darkest"
                    iconName="plus"
                    size={30}
                    onClick={addPairItem}
                />
            </S.Root>
        </>
    );
};

export default NewWord;

const S = {
    Root: styled.div`
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: center;

        width: calc(100% - 32px);
        margin: 20px 16px 0;
    `,
};
