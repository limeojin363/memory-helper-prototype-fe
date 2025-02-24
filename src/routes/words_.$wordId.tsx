import { createFileRoute } from "@tanstack/react-router";
import WordSetDetail from "../pages/WordSetDetailPage/WordsDetail";

export const Route = createFileRoute("/words_/$wordId")({
    component: () => {
        const { wordId } = Route.useParams();

        return <WordSetDetail wordsetId={wordId} />;
    },
});
