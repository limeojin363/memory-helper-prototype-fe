import ky, { BeforeRequestHook } from "ky";

const HOST =
    "https://port-0-memory-helper-prototype-be-m6ekc447ebe44eb6.sel4.cloudtype.app";

const PATHNAME_POSTFIX = "/api";

const setAuthorizationHeader: BeforeRequestHook = (request) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) return;
    request.headers.set("Authorization", `Bearer ${accessToken}`);
};

const KyInstance = ky.create({
    prefixUrl: HOST + PATHNAME_POSTFIX,
    headers: {
        "content-type": "application/json",
        
    },
    hooks: {
        beforeRequest: [setAuthorizationHeader],
    },
});

export default KyInstance;
