import { createFileRoute } from "@tanstack/react-router";
import NewWordsStep2 from "../components/page-specific/NewWords/NewWordsStep2";

export const Route = createFileRoute("/words_/new/2")({
    component: NewWordsStep2,
});
