import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/words_/new/")({
    component: () => <Navigate to="/words" />,
});
