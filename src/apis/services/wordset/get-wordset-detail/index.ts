import authenticatedApiClient from "../../../core/clients";
import { GetWordsetDetailFunc } from "./index.types";

const GetWordsetDetail: GetWordsetDetailFunc = ({ id }) =>
    authenticatedApiClient.get(`wordsets/${id}`);

export default GetWordsetDetail;