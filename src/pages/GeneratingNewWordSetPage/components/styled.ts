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
        box-shadow: 0 0 0 2px ${Colors["support-error-dark"]} inset;
    `,
    "SELECTABLE-UNSELECTED": css`
        box-shadow: 0 0 0 2px ${Colors["highlight-darkest"]} inset;
    `,
    INITIAL: css`
        box-shadow: 0 0 0 1px ${Colors["neutral-light-darkest"]} inset;
    `,
    DETERMINING: css`
        background-color: ${Colors["neutral-light-dark"]};
        animation: ${loading} 1s infinite;
    `,
    "SELECTABLE-SELECTED": css`
        box-shadow: 0 0 0 1px ${Colors["neutral-light-darkest"]} inset;
        background-color: ${Colors["neutral-light-darkest"]};
        :active {
            transform: scale(0.9);
        }
    `,
};

const S = {
    KorInputContainer: styled.input<SKorInputProps>`
        all: unset;
        border-radius: 12px;
        padding: 12px 16px;
        transition: transform 0.1s;

        ${({ status }) => KorStyleMap[status]}
    `,
    EngInputContainer: styled.input<SEngInputProps>`
        all: unset;
        border-radius: 12px;
        padding: 12px 16px;
        transition: transform 0.1s;

        box-shadow: 0 0 0 1px ${Colors["neutral-light-darkest"]} inset;
    `,
};

export default S;
