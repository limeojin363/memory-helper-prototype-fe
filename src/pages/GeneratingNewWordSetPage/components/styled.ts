import styled from "@emotion/styled";
import { Colors } from "../../../designs/colors";
import { css, keyframes, SerializedStyles } from "@emotion/react";
import { EngInputStatus, KorInputStatus } from "../types";

interface SKorInputProps {
    status: KorInputStatus;
}

interface SEngInputProps {
    status: EngInputStatus;
}
const loading = keyframes`
  0% {
    filter: brightness(0.8);
  }
  50% {
    filter: brightness(1);
  }
  100% {
    filter: brightness(0.8);
  }
`;

const KorStyleMap: { [key in KorInputStatus]: SerializedStyles } = {
    "NEEDS-CORRECTION": css`
        outline: 2px solid ${Colors["support-error-dark"]};
    `,
    "SELECTABLE-UNSELECTED": css`
        outline: 2px solid ${Colors["highlight-darkest"]};
    `,
    INITIAL: css`
        outline: 1px solid ${Colors["neutral-light-darkest"]};
    `,
    DETERMINING: css`
        background-color: ${Colors["neutral-light-dark"]};
        animation: ${loading} 1s infinite;
    `,
    "SELECTABLE-SELECTED": css`
        outline: 1px solid ${Colors["neutral-light-darkest"]};
        background-color: ${Colors["neutral-light-darkest"]};
        :active {
            transform: scale(0.9);
        }
    `,
};

const S = {
    KorInput: styled.input<SKorInputProps>`
        all: unset;
        border-radius: 12px;
        padding: 12px 16px;
        transition: transform 0.1s;

        ${({ status }) => KorStyleMap[status]}
    `,
    EngInput: styled.input<SEngInputProps>`
        all: unset;
        border-radius: 12px;
        padding: 12px 16px;
        transition: transform 0.1s;
    `,
};

export default S;
