import { Link, useLocation } from "@tanstack/react-router";
import S from "./StatusBar.styled";
import Icon, { IconName } from "../../icons/Icon";
import { FileRoutesByFullPath } from "../../../routeTree.gen";
import { ColorName } from "../../../designs/colors";

type ItemProps = {
    iconName: IconName;
    textView: string;
    path: keyof FileRoutesByFullPath;
};

const StatusItem = ({ iconName, textView, path }: ItemProps) => {
    const currentPathname = useLocation({
        select: (location) => location.pathname,
    });

    const colorName: ColorName =
        path === currentPathname ? "highlight-darkest" : "neutral-light-dark";

    return (
        <S.StatusItemInner>
            <Link to={path}>
                <S.StatusItemInner>
                    <Icon iconName={iconName} colorName={colorName} size={40} />
                    <div>{textView}</div>
                </S.StatusItemInner>
            </Link>
        </S.StatusItemInner>
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
