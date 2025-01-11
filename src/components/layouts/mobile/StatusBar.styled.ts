import styled from "@emotion/styled";

const S = {
    Root: styled.div`
        position: fixed;
        bottom: 0;

        width: 100%;
    `,
    StatusBarInner: styled.div`
        padding: 24px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `,
    StatusItemOuter: styled.div`
        width: 84px;
        height: 40px;

        color: red;
    `,
    StatusItemInner: styled.div`
        display: flex;
        justify-content: center;
        align-items: center;

        flex-direction: column;
    `,
};

export default S;
