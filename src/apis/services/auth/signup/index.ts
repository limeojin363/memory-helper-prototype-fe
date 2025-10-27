import { baseApiClient } from "../../../core/clients";
import { SignupFunc } from "./index.types";

const Signup: SignupFunc = ({ username, email, password }) =>
  baseApiClient.post("auth/signup", { json: { username, email, password } });

export default Signup;
