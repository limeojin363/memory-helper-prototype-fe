import { createFileRoute } from "@tanstack/react-router";
import ExamDetailPage from "../../pages/ExamDetail/components";

const Component = () => {
  const { examId } = Route.useParams();
  return <ExamDetailPage examId={Number(examId)} />;
};

export const Route = createFileRoute("/_authenticated/exam/$examId")({
  component: Component,
});
