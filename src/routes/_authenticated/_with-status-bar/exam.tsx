import { createFileRoute } from "@tanstack/react-router";
import ExamListPage from "../../../pages/ExamList";

export const Route = createFileRoute("/_authenticated/_with-status-bar/exam")({
  component: ExamListPage,
});
