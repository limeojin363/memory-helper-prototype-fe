import { createFileRoute } from "@tanstack/react-router";
import ExamDetail from "../../../pages/ExamDetail/ProblemsDetail";

const Component = () => {
    const { examId } = Route.useParams();
    return <ExamDetail examId={examId} />;
};

export const Route = createFileRoute("/_authenticated/exam/$examId")({
    component: Component,
});
