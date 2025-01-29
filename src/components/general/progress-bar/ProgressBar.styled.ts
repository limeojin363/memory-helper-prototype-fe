import styled from "@emotion/styled";
import { Colors } from "../../../designs/colors";

const S = {
    OuterWrapper: styled.div`
        width: 100%;
    `,
    InnerWrapper: styled.div<{ padding: number }>`
        padding: 0 ${({ padding }) => padding}px;

        display: flex;
        gap: 6px;
    `,
    Bar: styled.div<{ filled: boolean }>`
        background-color: ${({ filled }) =>
            filled ? Colors["highlight-darkest"] : Colors["neutral-light-light"]};
        height: 8px;
        flex: 1;
        border-radius: 4px;
    `,
};

export default S;
