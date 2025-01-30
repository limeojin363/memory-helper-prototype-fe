import styled from "@emotion/styled";
import { WordInputStatus } from "./WordInput";
import { Colors } from "../../../designs/colors";

interface ISInputProps {
    status: WordInputStatus;
}

const getBorderStyle = (status: WordInputStatus) => {
    switch (status) {
        case "INITIAL":
            return `1px solid ${Colors["neutral-light-darkest"]}`;
        case "OK":
            return `1px solid`;
        case "PRIMARY":
            return `1px solid`;
        case "WARNING":
            return `1px solid`;
    }
};

const S = {
    Input: styled.input<ISInputProps>`
        all: unset;
        border: ${({ status }) => getBorderStyle(status)};

        border-radius: 12px;

        width: calc(100% - 18px);
        padding: 12px 0 12px 16px;
    `,
};

export default S;
