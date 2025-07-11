import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type UserInfo = {
    username: string;
    email: string;
};

const accessTokenAtom = atomWithStorage<null | string>(
    "accessToken",
    JSON.parse(localStorage.getItem("accessToken") || "null"),
);
const refreshTokenAtom = atomWithStorage<null | string>(
    "refreshToken",
    JSON.parse(localStorage.getItem("refreshToken") || "null"),
);
const userInfoAtom = atomWithStorage<null | UserInfo>(
    "userInfo",
    JSON.parse(localStorage.getItem("userInfo") || "null"),
);

const useAuth = () => {
    const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
    const [refreshToken, setRefreshToken] = useAtom(refreshTokenAtom);
    const [userInfo, setUserInfo] = useAtom(userInfoAtom);

    // 수정 필요: 유효성이 미검증된 토큰의 존재만 확인하는 문제
    const getIsLoggedIn = !!accessToken;

    return {
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        userInfo,
        setUserInfo,
        getIsLoggedIn,
    };
};

export default useAuth;
