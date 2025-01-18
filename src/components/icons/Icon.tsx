import { Colors, ColorName } from "../../designs/colors";
import StatusItemProblem from "../../assets/icons/status-item-problem.svg?react";
import StatusItemSetting from "../../assets/icons/status-item-setting.svg?react";
import StatusItemWord from "../../assets/icons/status-item-word.svg?react";
import styled from "@emotion/styled";

const RawIcons = {
    "status-item-problem": StatusItemProblem,
    "status-item-setting": StatusItemSetting,
    "status-item-word": StatusItemWord,
} as const;

export type IconName = keyof typeof RawIcons;

export type IconProps = {
    iconName: IconName;
    colorName: ColorName;
    size: number;
};

const Icon = ({ iconName, colorName, size }: IconProps) => {
    const StyledIcon = styled(RawIcons[iconName])`
        width: ${size}px;
        height: ${size}px;
        [fill]:not([fill="none"]) {
            fill: ${Colors[colorName]};
        }
        [stroke]:not([stroke="none"]) {
            stroke: ${Colors[colorName]};
        }
    `;

    return <StyledIcon />;
};

export default Icon;
