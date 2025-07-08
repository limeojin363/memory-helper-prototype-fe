import authenticatedApiClient from "../../../core/clients";
import { GetAllExamsFunc } from "./index.types";

const GetAllExams: GetAllExamsFunc = () =>
    authenticatedApiClient.get("exam/all");

export default GetAllExams;
