import { Link, ToOptions, useLocation } from "@tanstack/react-router";
import S from "./StatusBar.styled";
import Icon, { IconName } from "../../icons/Icon";
import { ColorName } from "../../../../designs/colors";
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
                    <Icon
                        iconName={iconName}
                        colorName={iconColorName}
                        size={20}
                    />
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
        textView: "Word Sets",
        path: "/words",
    },
    {
        iconName: "status-item-problem",
        textView: "Problem Sets",
        path: "/problems",
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
