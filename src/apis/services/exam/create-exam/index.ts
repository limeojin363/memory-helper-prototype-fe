import authenticatedApiClient from "../../../core/clients";
import { CreateExamFunc } from "./index.types";

const CreateExam: CreateExamFunc = ({ setId }) =>
  authenticatedApiClient.post(`exam/${setId}`);

export default CreateExam;
