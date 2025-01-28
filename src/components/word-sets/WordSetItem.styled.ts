import styled from "@emotion/styled";
import { Colors } from "../../designs/colors";

const S = {
    Root: styled.div`
        display: flex;
        gap: 16px;
        align-items: center;
        
        user-select: none;

        background-color: ${Colors["neutral-light-light"]};

        padding: 16px;
        border-radius: 16px;
    `,
    Body: styled.div`
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex: 1;
    `,
    TextRow: styled.div`
        display: flex;
        gap: 4px;
    `,
};

export default S;
