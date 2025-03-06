import KyInstance from "../../core/ky";

const LogoutRequest = () =>
    KyInstance.post("auth/logout");

export default LogoutRequest;