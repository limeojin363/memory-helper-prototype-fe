import { createFileRoute } from "@tanstack/react-router";
import NewWord from "../pages/GeneratingNewWordSetPage/components/GeneratingNewWordSetPage";

export const Route = createFileRoute("/words_/new")({
    component: () => <NewWord />,
});
