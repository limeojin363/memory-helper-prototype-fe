import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type UserInfo = {
    username: string;
    email: string;
};

const accessTokenAtom = atomWithStorage<null | string>("accessToken", null);
const refreshTokenAtom = atomWithStorage<null | string>("refreshToken", null);
const userInfoAtom = atomWithStorage<null | UserInfo>("userInfo", null);

const useAuth = () => {
    const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
    const [refreshToken, setRefreshToken] = useAtom(refreshTokenAtom);
    const [userInfo, setUserInfo] = useAtom(userInfoAtom);

    const isLoginned = !!accessToken;

    return {
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        userInfo,
        setUserInfo,
        isLoginned,
    };
};

export default useAuth;