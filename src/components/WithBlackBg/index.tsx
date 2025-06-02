import { ReactNode } from "react";
import styled from "@emotion/styled";

const WithBlackBg = ({
    children,
    onClickBg,
}: {
    children: ReactNode;
    onClickBg: () => void;
}) => {
    return <S.Bg onClick={onClickBg}>{children}</S.Bg>;
};

export default WithBlackBg;

const S = {
    Bg: styled.div`
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);

        display: flex;
        justify-content: center;
        align-items: center;
    `,
};
