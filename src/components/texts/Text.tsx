import styled from "@emotion/styled";
import { Colors, ColorName } from "../../designs/colors";
import { css } from "@emotion/react";
import "@fontsource/inter/index.css"; // Defaults to weight 400
import React from "react";

export const FontStyleMap = {
    "heading-1": css`
        font-family: Inter;
        font-size: 24px;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
        letter-spacing: 0.24px;
    `,
    "heading-2": css`
        font-family: Inter;
        font-size: 18px;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
        letter-spacing: 0.09px;
    `,
    "heading-3": css`
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
        letter-spacing: 0.08px;
    `,
    "heading-4": css`
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    `,
    "heading-5": css`
        font-family: Inter;
        font-size: 12px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    `,
    "body-xl": css`
        font-family: Inter;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 133.333% */
    `,
    "body-lg": css`
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px; /* 137.5% */
    `,
    "body-md": css`
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 142.857% */
    `,
    "body-sm": css`
        font-family: Inter;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px; /* 133.333% */
        letter-spacing: 0.12px;
    `,
    "body-xs": css`
        font-family: Inter;
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: 14px; /* 140% */
        letter-spacing: 0.15px;
    `,
    "action-xl": css`
        font-family: Inter;
        font-size: 17px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    `,
    "action-lg": css`
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    `,
    "action-md": css`
        font-family: Inter;
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    `,
    "action-sm": css`
        font-family: Inter;
        font-size: 10px;
        font-style: normal;
        font-weight: 100;
        line-height: normal;
    `,
    "caption-md": css`
        font-family: Inter;
        font-size: 10px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: 0.5px;
        text-transform: uppercase;
    `,
};

export type FontStyleName = keyof typeof FontStyleMap;

type TextProps = {
    label: string;
    fontStyle?: FontStyleName;
    fontSize?: number;
    colorName?: ColorName;
    userSelect?: "none" | "auto";
} & React.HTMLAttributes<HTMLDivElement>;

const Text = ({
    label,
    fontStyle = "body-md",
    fontSize,
    colorName = "neutral-dark-dark",
    userSelect = "none",
}: TextProps) => {
    return (
        <S.Text
            colorName={colorName}
            fontSize={fontSize}
            fontStyle={fontStyle}
            userSelect={userSelect}
        >
            {label}
        </S.Text>
    );
};

export default Text;

const S = {
    Text: styled.div<{
        fontStyle: keyof typeof FontStyleMap;
        fontSize?: number;
        colorName: ColorName;
        userSelect: "none" | "auto";
    }>`
        ${({ fontStyle }) => FontStyleMap[fontStyle]}
        color: ${({ colorName }) => Colors[colorName]};
        user-select: ${({ userSelect }) => userSelect};
        font-size: ${({ fontSize }) => `${fontSize}px`};
        vertical-align: middle;
    `,
};
