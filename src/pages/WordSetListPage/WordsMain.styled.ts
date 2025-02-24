import styled from "@emotion/styled";
import { Colors } from "../../designs/colors";

const S = {
    MiddleArea: styled.div`
        display: flex;
        flex-direction: column;
        gap: 16px;

        width: calc(100% - 32px);
        margin: 20px 16px 0;
    `,
    AddButton: styled.div`
        all: unset;

        width: 60px;
        height: 60px;
        background-color: ${Colors["highlight-darkest"]};
        border-radius: 50%;

        display: flex;
        justify-content: center;
        align-items: center;

        position: fixed;
        bottom: 128px;
        right: 10%;

        z-index: 100;
    `,
};

export default S;
