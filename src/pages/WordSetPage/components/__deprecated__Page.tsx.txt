import { useNavigate } from "@tanstack/react-router";
import styled from "@emotion/styled";
import Header from "../../../components/layouts/mobile/Header";
import Icon from "../../../components/icons/Icon";
import WordItem from "./ListView/Item";
import { usePageState } from "../hooks/states/usePageStateNew";
import useHandlers from "../hooks/useServerData";
import { useEffect } from "react";

const GeneratingNewWordSetPage = () => {
    const navigate = useNavigate();

    const goBack = () => navigate({ to: "/words" });

    const { addNewPair, pairIdList } = usePageState();

    const { create, wordSetId } = useHandlers();

    useEffect(() => {
        if (!wordSetId) create();
    }, [create, wordSetId]);

    if (!wordSetId) return null;

    return (
        <>
            <Header title="New Word Set Generating" goBack={goBack} />
            <S.Root>
                {pairIdList.map((pairId) => (
                    <WordItem key={pairId} pairId={pairId} />
                ))}
                <Icon
                    colorName="neutral-dark-darkest"
                    iconName="plus"
                    size={30}
                    onClick={addNewPair}
                />
            </S.Root>
        </>
    );
};

export default GeneratingNewWordSetPage;

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
