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
    colorSetName: ColorSetName;
};

type ColorSetName =
    | "PRIMARY-INITIAL"
    | "PRIMARY-DISABLED"
    | "NEUTRAL-INITIAL"
    | "NEUTRAL-DISABLED";

const ColorSetMap: {
    [key in ColorSetName]: {
        bgColor: string;
        borderColor: string;
        textColor: string;
    };
} = {
    "NEUTRAL-DISABLED": {
        bgColor: Colors["neutral-light-dark"],
        borderColor: Colors["neutral-light-dark"],
        textColor: Colors["neutral-dark-dark"],
    },
    "NEUTRAL-INITIAL": {
        bgColor: "black",
        borderColor: "black",
        textColor: "black",
    },
    "PRIMARY-DISABLED": {
        bgColor: Colors["neutral-light-darkest"],
        borderColor: Colors["highlight-darkest"],
        textColor: Colors["neutral-dark-dark"],
    },
    "PRIMARY-INITIAL": {
        bgColor: "transparent",
        borderColor: Colors["highlight-dark"],
        textColor: Colors["neutral-dark-dark"],
    },
};

const S = {
    Root: styled.input<SProps>`
        width: calc(100% - 32px);
        border-radius: ${({ borderRadius }) =>
            borderRadius ? `${borderRadius}` : "12px"};

        border: none;
        outline: none;

        display: flex;
        justify-content: center;
        align-items: center;

        padding: 12px 16px;

        ${FontStyleMap["body-lg"]}

        color: black;

        background-color: ${({ colorSetName }) =>
            ColorSetMap[colorSetName].bgColor};
        box-shadow: 0 0 0 1px
            ${({ colorSetName }) => ColorSetMap[colorSetName].borderColor} inset;
        color: ${({ colorSetName }) => ColorSetMap[colorSetName].textColor};

        :focus {
            box-shadow: 0 0 0 2px
                ${({ colorSetName }) => ColorSetMap[colorSetName].borderColor}
                inset;
        }
    `,
};
