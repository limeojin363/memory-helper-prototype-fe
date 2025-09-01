import authenticatedApiClient from "@/apis/core/clients";
import { RenameExamFunc } from "./types";

export const RenameExam: RenameExamFunc = ({ examId, examName }) =>
    authenticatedApiClient.patch(`exam/name/${examId}`, { json: { testName: examName } });