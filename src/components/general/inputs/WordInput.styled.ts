import styled from "@emotion/styled";
import { WordInputStatus } from "./WordInput";
import { Colors } from "../../../designs/colors";
import { css, keyframes } from "@emotion/react";

interface ISInputProps {
    status: WordInputStatus;
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

const getStyle = (status: WordInputStatus) =>
    ({
        INITIAL: css`
            outline: 1px solid ${Colors["neutral-light-darkest"]};
        `,
        "OK-FIXED": css`
            outline: 2px solid ${Colors["highlight-darkest"]};
        `,
        "NEEDS-CORRECTION": css`
            outline: 2px solid ${Colors["support-error-dark"]};
        `,
        LOADING: css`
            background-color: ${Colors["neutral-light-dark"]};

            ::placeholder {
                opacity: 0;
            }

            animation: ${loading} 1s infinite;
        `,
    })[status];

const S = {
    Input: styled.input<ISInputProps>`
        all: unset;

        border-radius: 12px;

        width: calc(100% - 18px);
        padding: 12px 0 12px 16px;

        ${({ status }) => getStyle(status)}
    `,
};

export default S;
