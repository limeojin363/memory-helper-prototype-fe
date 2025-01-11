import { createFileRoute } from "@tanstack/react-router";
import Icon from "../components/icons/Icon";

const RouteComponent = () => {
    return (
        <div>
            <Icon
                colorName="highlight-light"
                iconName="status-item-setting"
                size={100}
            />
        </div>
    );
};

export const Route = createFileRoute("/words")({
    component: RouteComponent,
});
