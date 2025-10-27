import styled from "@emotion/styled";
import { Link, ToOptions, useLocation } from "@tanstack/react-router";
import Icon, { IconName } from "../../icons/Icon";
import { ColorName, Colors } from "../../../designs/colors";
import Text, { FontStyleName } from "../../texts/Text";

type ItemProps = {
  iconName: IconName;
  textView: string;
  path: ToOptions["to"];
};

const StatusItem = ({ iconName, textView, path }: ItemProps) => {
  const currentPathname = useLocation({
    select: (location) => location.pathname,
  });

  const isSelected = path === currentPathname;

  const iconColorName: ColorName = isSelected
    ? "highlight-darkest"
    : "neutral-light-dark";

  const textColorName: ColorName = isSelected
    ? "neutral-dark-darkest"
    : "neutral-light-dark";

  const fontStyle: FontStyleName = isSelected ? "action-md" : "body-sm";

  return (
    <S.StatusItemOuter>
      <Link to={path}>
        <S.StatusItemInner>
          <Icon iconName={iconName} colorName={iconColorName} size={20} />
          <Text
            colorName={textColorName}
            label={textView}
            fontStyle={fontStyle}
          />
        </S.StatusItemInner>
      </Link>
    </S.StatusItemOuter>
  );
};

const itemList: ItemProps[] = [
  {
    iconName: "status-item-word",
    textView: "Wordsets",
    path: "/wordset",
  },
  {
    iconName: "status-item-exam",
    textView: "Exams",
    path: "/exam",
  },
  {
    iconName: "status-item-setting",
    textView: "Settings",
    path: "/settings",
  },
];

const MobileStatusBar = () => {
  return (
    <S.Root>
      <S.StatusBarInner>
        {itemList.map((props, i) => (
          <StatusItem key={i} {...props} />
        ))}
      </S.StatusBarInner>
    </S.Root>
  );
};

export default MobileStatusBar;

const S = {
  Root: styled.div`
    position: fixed;
    bottom: 0;

    width: 100%;

    background-color: ${Colors["neutral-light-medium"]};
    border-top: ${Colors["neutral-light-dark"]} solid 2px;
  `,
  StatusBarInner: styled.div`
    padding: 24px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  StatusItemOuter: styled.div`
    width: 84px;
    height: 40px;

    a {
      text-decoration: none;
    }
  `,
  StatusItemInner: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    gap: 4px;

    flex-direction: column;
  `,
};
