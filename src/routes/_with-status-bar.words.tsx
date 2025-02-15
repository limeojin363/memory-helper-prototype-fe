import { createFileRoute } from "@tanstack/react-router";
import WordsMain from "../components/page-specific/WordsMain/WordsMain";

export const Route = createFileRoute("/_with-status-bar/words")({
    component: WordsMain,
});
