import { createFileRoute } from "@tanstack/react-router";
import ExamResultPage from "../../pages/ExamResult";

const Component = () => {
    const { resultId } = Route.useParams();
    return <ExamResultPage resultId={Number(resultId)} />;
};

export const Route = createFileRoute("/_authenticated/result_/$resultId")({
    component: Component,
});
