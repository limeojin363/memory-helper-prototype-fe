import { Colors, ColorName } from "../../../designs/colors";
import IcStatusItemProblem from "../../../assets/icons/status-item-problem.svg?react";
import IcStatusItemSetting from "../../../assets/icons/status-item-setting.svg?react";
import IcStatusItemWord from "../../../assets/icons/status-item-word.svg?react";
import IcArrowLeft from "../../../assets/icons/arrow-left.svg?react";
import IcSearch from "../../../assets/icons/search.svg?react";
import IcEnter from "../../../assets/icons/enter.svg?react";
import IcDragHandle from "../../../assets/icons/drag-handle.svg?react";
import IcPlus from "../../../assets/icons/plus.svg?react";
import IcTrash from "../../../assets/icons/trash.svg?react";
import styled from "@emotion/styled";
import { MouseEventHandler } from "react";

const RawIcons = {
    "status-item-problem": IcStatusItemProblem,
    "status-item-setting": IcStatusItemSetting,
    "status-item-word": IcStatusItemWord,
    "arrow-left": IcArrowLeft,
    search: IcSearch,
    enter: IcEnter,
    "drag-handle": IcDragHandle,
    plus: IcPlus,
    trash: IcTrash,
} as const;

export type IconName = keyof typeof RawIcons;

export type IconProps = {
    iconName: IconName;
    colorName: ColorName;
    size: number;
    onClick?: MouseEventHandler;
};

const Icon = ({ iconName, colorName, size, onClick }: IconProps) => {
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

    return <StyledIcon onClick={onClick} />;
};

export default Icon;
