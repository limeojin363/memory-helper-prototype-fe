import authenticatedApiClient from "../../../core/clients";
import { GetExamsFunc } from "./index.types";

const GetExams: GetExamsFunc = ({ page, size, name, setId }) =>
  authenticatedApiClient.get("exam/list", {
    searchParams: new URLSearchParams({
      ...(page && { page: String(page) }),
      ...(size && { size: String(size) }),
      ...(name && { name: String(name) }),
      ...(setId && { setId: String(setId) }),
    }),
  });

export default GetExams;
