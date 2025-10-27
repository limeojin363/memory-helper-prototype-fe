import authenticatedApiClient from "../../../core/clients";
import { DeleteExamFunc } from "./index.types";

const DeleteExam: DeleteExamFunc = ({ examId }) =>
  authenticatedApiClient.delete(`exam/${examId}`);

export default DeleteExam;
