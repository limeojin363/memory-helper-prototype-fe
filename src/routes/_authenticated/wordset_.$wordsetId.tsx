import { createFileRoute } from "@tanstack/react-router";
import WordsetDetailPage from "../../pages/WordsetDetailPage/components";

const Component = () => {
    const { wordsetId } = Route.useParams();

    return <WordsetDetailPage wordsetId={Number(wordsetId)} />;
};

export const Route = createFileRoute("/_authenticated/wordset_/$wordsetId")({
    component: Component,
});
