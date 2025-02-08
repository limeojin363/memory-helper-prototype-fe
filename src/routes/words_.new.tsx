import { createFileRoute } from "@tanstack/react-router";
import NewWordLayout from "../components/page-specific/NewWords/NewWord";

export const Route = createFileRoute("/words_/new")({
    component: () => <NewWordLayout />,
});
