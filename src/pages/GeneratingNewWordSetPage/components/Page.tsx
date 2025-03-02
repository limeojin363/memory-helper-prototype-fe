import { useNavigate } from "@tanstack/react-router";
import styled from "@emotion/styled";
import Header from "../../../components/layouts/mobile/Header";
import Icon from "../../../components/icons/Icon";
import WordInputPairItem from "./InputPairItem";
import {
    makeNewPairItem,
    useGenerateNewWordSetPageData,
} from "../hooks/useGeneratingNewWordSetPageData";

const NewWord = () => {
    const navigate = useNavigate();

    const goBack = () => navigate({ to: "/words" });

    const [page, setPage] = useGenerateNewWordSetPageData();

    const insertPair = () =>
        setPage((draft) => {
            draft.push(makeNewPairItem());
        });

    return (
        <>
            <Header title="New Word Set Generating" goBack={goBack} />
            <S.Root>
                {page.map((item) => (
                    <WordInputPairItem key={item.id} pairId={item.id} />
                ))}
                <Icon
                    colorName="neutral-dark-darkest"
                    iconName="plus"
                    size={30}
                    onClick={insertPair}
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
