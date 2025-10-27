import authenticatedApiClient from "../../../core/clients";
import { GetWordsetListResFunc } from "./index.types";

const GetWordsetList: GetWordsetListResFunc = ({ name, page, size }) =>
  authenticatedApiClient.get("wordsets/list", {
    searchParams: new URLSearchParams({
      ...(name && { name: String(name) }),
      ...(page && { page: String(page) }),
      ...(size && { size: String(size) }),
    }),
  });

export default GetWordsetList;
