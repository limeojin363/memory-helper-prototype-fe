import { createFileRoute } from "@tanstack/react-router";
import ExamSolvingPage from "../../pages/ExamSolving";

const Component = () => {
    const { examId } = Route.useParams();
    return <ExamSolvingPage examId={Number(examId)} />;
};

export const Route = createFileRoute("/_authenticated/exam_/$examId/solve")({
    component: Component,
});
