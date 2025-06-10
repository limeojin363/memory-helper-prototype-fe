import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Colors } from "../../designs/colors";
import { FontStyleMap } from "../texts/Text";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & SProps;

const TextField = ({ ...props }: TextFieldProps) => {
    return <S.Root type="text" {...props} />;
};

export default TextField;

type SProps = {
    height?: string;
    width?: string;
    borderRadius?: string;
    activeTransformScale?: number;
    disabled?: boolean;
};

const S = {
    Root: styled.input<SProps>`
        width: ${({ width }) =>
            width
                ? `${width}`
                : // padding 보정
                  "calc(100% - 32px)"};
        /* height: ${({ height }) => (height ? `${height}` : "40px")}; */
        border-radius: ${({ borderRadius }) =>
            borderRadius ? `${borderRadius}` : "12px"};

        border: none;

        display: flex;
        justify-content: center;
        align-items: center;

        padding: 12px 16px;

        ${FontStyleMap["body-lg"]}

        ${({ disabled }) =>
            disabled
                ? css`
                      background-color: ${Colors["neutral-light-dark"]};
                      box-shadow: 0 0 0 1px ${Colors["neutral-dark-lightest"]}
                          inset;
                  `
                : css`
                      background-color: ${Colors["neutral-light-medium"]};
                      box-shadow: 0 0 0 1px ${Colors["neutral-light-darkest"]}
                          inset;
                  `} /* :focus-visible {
            box-shadow: 0 0 0 3px ${Colors["neutral-dark-darkest"]} inset;
        } */
    `,
};
