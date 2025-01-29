import { createFileRoute } from "@tanstack/react-router";
import NewWordsStep1 from "../components/page-specific/NewWords/NewWordsStep1";

export const Route = createFileRoute("/words_/new/1")({
    component: NewWordsStep1,
});
