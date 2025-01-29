import { createFileRoute } from "@tanstack/react-router";
import ProblemsDetail from "../components/page-specific/ProblemsDetail/ProblemsDetail";

export const Route = createFileRoute("/problems_/$problemId")({
    component: () => {
        const { problemId } = Route.useParams();
        return <ProblemsDetail problemsId={problemId} />;
    },
});
