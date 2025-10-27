import { Colors, ColorName } from "../../designs/colors";
import IcStatusItemExam from "../../assets/icons/status-item-exam.svg?react";
import IcStatusItemSetting from "../../assets/icons/status-item-setting.svg?react";
import IcStatusItemWord from "../../assets/icons/status-item-word.svg?react";
import IcArrowLeft from "../../assets/icons/arrow-left.svg?react";
import IcSearch from "../../assets/icons/search.svg?react";
import IcEnter from "../../assets/icons/enter.svg?react";
import IcDragHandle from "../../assets/icons/drag-handle.svg?react";
import IcPlus from "../../assets/icons/plus.svg?react";
import IcTrash from "../../assets/icons/trash.svg?react";
import IcSubmit from "../../assets/icons/submit.svg?react";
import IcLinedArrowPrev from "../../assets/icons/lined-arrow-prev.svg?react";
import IcLinedArrowNext from "../../assets/icons/lined-arrow-next.svg?react";
import IcChoiceCheck from "../../assets/icons/choice-check.svg?react";
import IcResultRight from "../../assets/icons/result-right.svg?react";
import IcResultWrong from "../../assets/icons/result-wrong.svg?react";
import IcModifyPen from "../../assets/icons/modify-pen.svg?react";
import styled from "@emotion/styled";
import { MouseEventHandler } from "react";

const RawIcons = {
  "status-item-exam": IcStatusItemExam,
  "status-item-setting": IcStatusItemSetting,
  "status-item-word": IcStatusItemWord,
  "arrow-left": IcArrowLeft,
  search: IcSearch,
  enter: IcEnter,
  "drag-handle": IcDragHandle,
  plus: IcPlus,
  trash: IcTrash,
  submit: IcSubmit,
  "lined-arrow-prev": IcLinedArrowPrev,
  "lined-arrow-next": IcLinedArrowNext,
  "choice-check": IcChoiceCheck,
  "result-right": IcResultRight,
  "result-wrong": IcResultWrong,
  "modify-pen": IcModifyPen,
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
