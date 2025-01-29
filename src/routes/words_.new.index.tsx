import { createFileRoute, Navigate } from "@tanstack/react-router";

const GererateNewWordSetRouteComponent = () => {
    return <Navigate to="/words" />;
};

export const Route = createFileRoute("/words_/new/")({
    component: GererateNewWordSetRouteComponent,
});
