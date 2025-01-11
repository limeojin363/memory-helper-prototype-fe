import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/problems_/$problemId")({
    component: RouteComponent,
});

function RouteComponent() {
    const { problemId } = Route.useParams();

    return <div>{problemId}</div>;
}
