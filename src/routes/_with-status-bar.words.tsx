import { createFileRoute } from "@tanstack/react-router";
import WordsMain from "../pages/WordSetListPage/WordsMain";

export const Route = createFileRoute("/_with-status-bar/words")({
    component: WordsMain,
});
