import { useNavigate } from "@tanstack/react-router";
import styled from "@emotion/styled";
import Header from "../../../components/layouts/mobile/Header";
import Icon from "../../../components/icons/Icon";
import WordInputPairItem from "./InputPairItem";
import { usePageState } from "../hooks/states/usePageStateNew";
import useCreateNewWordSet from "../hooks/handlers/useCreateNewWordSet";
import useFinishGeneratingStep from "../hooks/handlers/useFinishGeneratingStep";

const NewWord = () => {
    const navigate = useNavigate();

    const goBack = () => navigate({ to: "/words" });

    const { addNewPair, pairIdList } = usePageState();

    const { data: newWordSetData } = useCreateNewWordSet();

    const finish = useFinishGeneratingStep();

    if (!newWordSetData) return null;


    return (
        <>
            <Header title="New Word Set Generating" goBack={goBack} />
            <S.Root>
                {pairIdList.map((pairId) => (
                    <WordInputPairItem key={pairId} pairId={pairId} />
                ))}
                <Icon
                    colorName="neutral-dark-darkest"
                    iconName="plus"
                    size={30}
                    onClick={addNewPair}
                />
                <button
                    onClick={finish}
                >
                    제출하기
                </button>
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
