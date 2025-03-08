import styled from "@emotion/styled";
import { Colors } from "../../../designs/colors";
import { css, keyframes, SerializedStyles } from "@emotion/react";
import { EngStatus, KorStatus, PairStatus } from "../types";

interface SKorInputProps {
    status: KorStatus;
}

interface SEngInputProps {
    status: EngStatus;
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

const KorStyleMap: { [key in KorStatus]: SerializedStyles } = {
    "NEEDS-CORRECTION": css`
        box-shadow: 0 0 0 2px ${Colors["support-red-dark"]} inset;
    `,
    "SELECTABLE-UNSELECTED": css`
        box-shadow: 0 0 0 2px ${Colors["highlight-darkest"]} inset;
        :active {
            transform: scale(0.97);
        }
    `,
    "SELECTABLE-SELECTED": css`
        box-shadow: 0 0 0 2px ${Colors["highlight-darkest"]} inset;
        :active {
            transform: scale(0.97);
        }
        background-color: ${Colors["highlight-light"]};
    `,
    INITIAL: css`
        box-shadow: 0 0 0 1px ${Colors["neutral-light-darkest"]} inset;
    `,
    WAITING: css`
        background-color: ${Colors["neutral-light-dark"]};
    `,
};

const EngStyleMap: { [key in EngStatus]: SerializedStyles } = {
    "NEEDS-CORRECTION": css`
        box-shadow: 0 0 0 2px ${Colors["support-red-dark"]} inset;
    `,
    OK: css`
        box-shadow: 0 0 0 2px ${Colors["highlight-darkest"]} inset;
        background-color: ${Colors["highlight-light"]};
    `,
    INITIAL: css`
        box-shadow: 0 0 0 1px ${Colors["neutral-light-darkest"]} inset;
    `,
    WAITING: css`
        background-color: ${Colors["neutral-light-dark"]};
        /* animation: ${loading} 1s infinite; */
    `,
};

const PairStyleMap: { [key in PairStatus]: SerializedStyles } = {
    INITIAL: css`
        box-shadow: 0 0 0 2px ${Colors["neutral-light-darkest"]} inset;
    `,
    WAITING: css`
        box-shadow: 0 0 0 2px ${Colors["neutral-light-darkest"]} inset;
    `,
    "ENG-ERROR": css`
        box-shadow: 0 0 0 2px ${Colors["support-red-dark"]} inset;
    `,
    "SELECTING-KOR": css`
        box-shadow: 0 0 0 2px ${Colors["neutral-light-darkest"]} inset;
    `,
    USABLE: css`
        box-shadow: 0 0 0 3px ${Colors["highlight-darkest"]} inset;
    `,
};

const S = {
    KorInputContainer: styled.input<SKorInputProps>`
        all: unset;
        border-radius: 12px;
        padding: 12px 16px;
        transition: all 0.1s;

        ${({ status }) => KorStyleMap[status]}
    `,
    EngInput: styled.input<SEngInputProps>`
        all: unset;
        border-radius: 12px;
        padding: 12px 16px;
        transition: all 0.1s;

        width: 100%;

        ${({ status }) => EngStyleMap[status]}
    `,
    EngAreaContainer: styled.div`
        position: relative;

        display: flex;
        flex-direction: column;
        gap: 8px;

        position: relative;
    `,
    WordInputPairItemWrapper: styled.div<{
        pairStatus: PairStatus;
    }>`
        ${({ pairStatus }) => PairStyleMap[pairStatus]}

        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 4px;

        padding: 4px;

        border-radius: 10px;
    `,
    InputArea: styled.div`
        display: flex;
        flex-direction: column;
        gap: 20px;

        padding: 4px;
    `,
    KorPlusWrapper: styled.div`
        width: 16px;
        height: 16px;

        display: flex;
        align-items: center;
        justify-content: center;

        border: 1px solid;
        border-radius: 6px;

        background-color: ${Colors["neutral-light-darkest"]};
    `,
    KorAreaContainer: styled.div`
        flex: 1;

        display: flex;
        flex-direction: column;
        gap: 8px;
    `,
    KorTopWrapper: styled.div`
        display: flex;
        justify-content: space-between;
    `,
    KorItemsWrapper: styled.div`
        display: flex;
        flex-direction: column;
        gap: 6px;
    `,
    KorItemWrapper: styled.div`
        position: relative;
        display: flex;
        flex-direction: column;
    `,
    EngInputWrapper: styled.div`
        position: relative;
        width: 100%;

        display: flex;
    `,
    SideIconPositionor: styled.div<{ right: number }>`
        position: absolute;

        right: ${({ right }) => right}px;
        bottom: calc(50%);
        transform: translateY(50%);

        transition: all 0.2s ease-in-out;
    `,
    IcButtonWrapper: styled.div<{ size: number }>`
        ${({ size }) => `
            width: ${size}px;
            height: ${size}px;
        `}

        display: flex;
        align-items: center;
        justify-content: center;

        background-color: ${Colors["neutral-light-darkest"]};

        border-radius: 30%;

        :active {
            transform: scale(0.9);
        }
    `,
};

export default S;
