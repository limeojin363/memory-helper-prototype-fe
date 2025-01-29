import styled from "@emotion/styled";
import { useNavigate } from "@tanstack/react-router";

const NewWordsStep1 = () => {
    const navigate = useNavigate();

    const wordInputPairListData = [];

    return <S.Root></S.Root>;
};

const WordInputPairItem = () => {
    return <div>WordInputPairItem</div>;
};

const S = {
    Root: styled.div`
        display: flex;
        flex-direction: column;

        gap: 8px;
    `,
    WordInputPairItemWrapper: styled.div``,
};

export default NewWordsStep1;