import { useMutation } from "@tanstack/react-query";
import AuthApi from "../../../apis/services/auth";
import useAuth from "../../../hooks/useAuth";
import { NavigateOptions, useNavigate } from "@tanstack/react-router";

const useLogin = ({
  navigateOptionAfterSuccessfullyLoggedIn,
}: {
  navigateOptionAfterSuccessfullyLoggedIn: NavigateOptions;
}) => {
  const { setAccessToken, setRefreshToken, setUserInfo } = useAuth();

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: AuthApi.Login,
    onSuccess: async (res) => {
      const { data } = await res.json();

      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      setUserInfo({
        username: data.username,
        email: "null@null.com",
      });

      navigate(navigateOptionAfterSuccessfullyLoggedIn);
    },
  });

  return mutate;
};

export default useLogin;
