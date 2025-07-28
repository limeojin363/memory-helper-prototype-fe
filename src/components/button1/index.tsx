import styled from "@emotion/styled";
import { Colors } from "../../designs/colors";
import { css } from "@emotion/react";

export type Button1Props = { children: React.ReactNode } & SProps &
    React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button1 = ({
    children,
    height,
    width,
    borderRadius,
    activeTransformScale,
    bgColor,
    colorStyle = "Primary",
    ...props
}: Button1Props) => {
    return (
        <S.Root
            height={height}
            width={width}
            borderRadius={borderRadius}
            activeTransformScale={activeTransformScale}
            bgColor={bgColor}
            colorStyle={colorStyle}
            {...props}
        >
            {children}
        </S.Root>
    );
};

export default Button1;

type SProps = {
    height?: string;
    width?: string;
    borderRadius?: string;
    borderColor?: string;
    activeTransformScale?: number;
    bgColor?: string;
    colorStyle?: keyof typeof ColorStyleMap;
};

// box-shadow, background-color Preset
const ColorStyleMap = {
    Primary: css`
        box-shadow: 0 0 0 1.4px ${Colors["highlight-medium"]} inset;
        background-color: ${Colors["highlight-lightest"]};
    `,
    Neutral: css`
        background-color: ${Colors["neutral-light-medium"]};
        box-shadow: 0 0 0 1.4px ${Colors["neutral-dark-darkest"]} inset;
    `,
    NeutralSelected: css`
        background-color: ${Colors["neutral-light-medium"]};
        box-shadow: 0 0 0 3px ${Colors["neutral-dark-darkest"]} inset;
    `,
    Disabled: css`
        background-color: ${Colors["neutral-light-dark"]};
        box-shadow: 0 0 0 1.4px ${Colors["neutral-dark-darkest"]} inset;
    `,
};

const S = {
    Root: styled.button<SProps>`
        width: ${({ width }) => (width ? `${width}` : "100%")};
        height: ${({ height }) => (height ? `${height}` : "40px")};
        border-radius: ${({ borderRadius }) =>
            borderRadius ? `${borderRadius}` : "12px"};


        border: none;

        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;

        ${({ colorStyle }) => colorStyle && ColorStyleMap[colorStyle]}
        ${({bgColor}) => bgColor && css`
            background-color: ${bgColor};
        `}
        ${({ borderColor }) => borderColor && css`
            box-shadow: 0 0 0 1.4px ${borderColor} inset;
        `}

        :active {
            transform: scale(
                ${({ activeTransformScale }) => activeTransformScale || 0.99}
            );
        }
        :focus-visible {
            box-shadow: 0 0 0 3px ${Colors["neutral-dark-darkest"]} inset;
        }
    `,
};
