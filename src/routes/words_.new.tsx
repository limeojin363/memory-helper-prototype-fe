import { createFileRoute, Outlet } from "@tanstack/react-router";
import NewWordLayout from "../components/page-specific/NewWords/NewWordLayout";

export const Route = createFileRoute("/words_/new")({
    component: () => (
        <NewWordLayout>
            <Outlet />
        </NewWordLayout>
    ),
});
