import styled from "@emotion/styled";
import { ColorMap, ColorName } from "../../designs/colors";
import { css } from "@emotion/react";

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
    fontStyle: FontStyleName;
    colorName?: ColorName;
};

const Text = ({
    label,
    fontStyle,
    colorName = "neutral-dark-dark",
}: TextProps) => {
    return (
        <S.Text colorName={colorName} fontStyle={fontStyle}>
            {label}
        </S.Text>
    );
};

export default Text;
const a = css`
    font-size: 20px;
`;

const S = {
    Text: styled.div<{
        fontStyle: keyof typeof FontStyleMap;
        colorName: ColorName;
    }>`
        ${({ fontStyle }) => FontStyleMap[fontStyle]}
        color: ${({ colorName }) => ColorMap[colorName]};
    `,
};
