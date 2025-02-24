import styled from "@emotion/styled";
import { Colors } from "../../../designs/colors";
import { FontStyleMap } from "../../texts/Text";

const S = {
    Outer: styled.div`
        background-color: ${Colors["neutral-light-light"]};

        border-radius: 24px;
    `,
    Inner: styled.div`
        padding: 12px 16px;
        
        display: flex;
        flex-direction: row;
        gap: 16px;
        align-items: center;
        justify-content: space-between;
    `,
    Input: styled.input`
        ${FontStyleMap["body-md"]}

        all: unset;

        /* min-width -> 왜 필요한지는 모르겠는데 이거 써야 스타일이 깨지지 않음 */
        min-width: 0;
        flex: 1;
    `
};

export default S;
