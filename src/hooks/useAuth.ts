import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type UserInfo = {
    username: string;
    email: string;
};

const accessTokenAtom = atomWithStorage<null | string>(
    "accessToken",
    localStorage.getItem("accessToken"),
);
const refreshTokenAtom = atomWithStorage<null | string>(
    "refreshToken",
    localStorage.getItem("refreshToken"),
);
const userInfoAtom = atomWithStorage<null | UserInfo>("userInfo", null);

const useAuth = () => {
    const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
    const [refreshToken, setRefreshToken] = useAtom(refreshTokenAtom);
    const [userInfo, setUserInfo] = useAtom(userInfoAtom);

    const isLoggedIn = !!accessToken;

    return {
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        userInfo,
        setUserInfo,
        isLoginned: isLoggedIn,
    };
};

export default useAuth;
