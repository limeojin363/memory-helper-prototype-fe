import { createFileRoute } from "@tanstack/react-router";
import WordSetDetail from "../../pages/WordSetDetailPage/components/WordSetDetail";

const Component = () => {
    const { wordSetId } = Route.useParams();

    return <WordSetDetail wordsetId={Number(wordSetId)} />;
};

export const Route = createFileRoute("/_authenticated/words_/$wordSetId")({
    component: Component,
});
