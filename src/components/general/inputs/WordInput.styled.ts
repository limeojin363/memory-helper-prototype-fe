import styled from "@emotion/styled";
import { WordInputStatus } from "./WordInput";

interface ISInputProps {
    status: WordInputStatus;
}

const getBorderStyle = (status: WordInputStatus) => {
    switch (status) {
        case "INITIAL":
            return `1px solid`;
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
    `,
};

export default S;
