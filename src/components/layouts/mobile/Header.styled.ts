import styled from "@emotion/styled";

const S = {
    Root: styled.div`
        display: flex;
        align-items: center;
        justify-content: center;

        height: 56px;
    `,
    ArrowWrapper: styled.div`
        position: absolute;
        left: 20px;
        :active {
            transform: scale(0.9);
        }
    `,
};

export default S;
