import { createFileRoute } from '@tanstack/react-router'
import WordsetPage from "../../pages/WordSetPage/components/Page";

export const Route = createFileRoute("/_authenticated/words_/new")({
    component: () => <WordsetPage />,
});
