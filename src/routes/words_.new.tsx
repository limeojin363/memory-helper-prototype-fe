import { createFileRoute } from "@tanstack/react-router";
import NewWord from "../pages/GeneratingNewWordSetPage/components/Page";

export const Route = createFileRoute("/words_/new")({
    component: () => <NewWord />,
});
