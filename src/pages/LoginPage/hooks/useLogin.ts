import { useMutation } from "@tanstack/react-query";
import HttpAuthRequests from "../../../apis/services/auth";
import useAuth from "../../../hooks/useAuth";

const useLogin = () => {
    const { setAccessToken, setRefreshToken, setUserInfo } = useAuth();

    const { mutate } = useMutation({
        mutationFn: HttpAuthRequests.Login,
        onSuccess: async (res) => {
            const { data } = await res.json();

            console.log(data)

            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);
            setUserInfo({
                username: data.username,
                email: "null@null.com",
            });
        },
    });

    return mutate;
};

export default useLogin;
