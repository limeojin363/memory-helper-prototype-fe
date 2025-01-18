import { createFileRoute } from "@tanstack/react-router";
import Icon from "../components/icons/Icon";
import ProgressBar from "../components/progress-bar/ProgressBar";

const RouteComponent = () => {
    return (
        <div>
            <Icon
                colorName="highlight-light"
                iconName="status-item-setting"
                size={100}
            />
            <ProgressBar total={3} current={1} />
        </div>
    );
};

export const Route = createFileRoute("/words")({
    component: RouteComponent,
});
