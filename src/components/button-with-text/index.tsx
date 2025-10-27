import styled from "@emotion/styled";
import { Colors } from "../../designs/colors";
import { css } from "@emotion/react";
import Text from "../texts/Text";

export type ButtonWithTextProps = { text: string } & SProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

// TODO: 색상값 좀 더 세련되게 처리하기. Ex) LineColor, BgColor로 이원화?
// TODO: ButtonWithIcon 작성
const ButtonWithText = ({
  text,
  height,
  width,
  borderRadius,
  activeTransformScale,
  bgColor,
  disabled,
  ...props
}: ButtonWithTextProps) => {
  return (
    <S.Root
      height={height}
      width={width}
      borderRadius={borderRadius}
      activeTransformScale={activeTransformScale}
      bgColor={bgColor}
      disabled={disabled}
      {...props}
    >
      <Text
        label={text}
        fontStyle="action-lg"
        colorName={disabled ? "neutral-dark-lightest" : "neutral-dark-darkest"}
      />
    </S.Root>
  );
};

export default ButtonWithText;

type SProps = {
  height?: string;
  width?: string;
  borderRadius?: string;
  activeTransformScale?: number;
  bgColor?: string;
  colorStyle?: keyof typeof ColorStyleMap;
  disabled?: boolean;
};

// box-shadow, background-color Preset
const ColorStyleMap = {
  Neutral: css`
    background-color: ${Colors["neutral-light-medium"]};
    box-shadow: 0 0 0 1.4px ${Colors["neutral-dark-darkest"]} inset;
  `,
  Disabled: css`
    background-color: ${Colors["neutral-light-dark"]};
    box-shadow: 0 0 0 1.4px ${Colors["neutral-dark-lightest"]} inset;
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

    ${({ disabled }) =>
      disabled ? ColorStyleMap.Disabled : ColorStyleMap.Neutral}

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
