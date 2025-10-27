import authenticatedApiClient from "../../../core/clients";
import { GetExamFunc } from "./index.types";

const GetExam: GetExamFunc = ({ examId }) =>
  authenticatedApiClient.get(`exam/${examId}`);

export default GetExam;
