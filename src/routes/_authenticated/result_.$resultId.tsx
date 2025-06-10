import { createFileRoute } from "@tanstack/react-router";
import ExamResultPage from "../../pages/ExamResult/components";

export const Route = createFileRoute("/_authenticated/result_/$resultId")({
    component: RouteComponent,
});

function RouteComponent() {
    return <Component />;
}

const Component = () => {
    const { resultId } = Route.useParams();
    return <ExamResultPage resultId={Number(resultId)} />;
};
