import { createFileRoute } from "@tanstack/react-router";
import ProgressBar from "../components/progress-bar/ProgressBar";
import Header from "../components/layouts/mobile/Header";
import SearchBar from "../components/layouts/mobile/SearchBar";

const RouteComponent = () => {
    return (
        <div>
            <Header title="words" goBack={() => {}} />
            <ProgressBar total={3} current={1} />
            <SearchBar />
        </div>
    );
};

export const Route = createFileRoute("/words")({
    component: RouteComponent,
});
