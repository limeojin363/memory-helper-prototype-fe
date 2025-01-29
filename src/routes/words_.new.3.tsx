import { createFileRoute } from "@tanstack/react-router";
import NewWordsStep3 from "../components/page-specific/NewWords/NewWordsStep3";

export const Route = createFileRoute("/words_/new/3")({
    component: NewWordsStep3,
});
