import { useState } from "react";
import useLogin from "../hooks/useLogin";
import S from "./styled";
import Header from "../../../components/layouts/mobile/Header";
import { NavigateOptions } from "@tanstack/react-router";
import Text from "../../../components/texts/Text";

const LoginPage = ({
  navigateOptionAfterSuccessfullyLoggedIn = { to: "/wordset" },
}: {
  navigateOptionAfterSuccessfullyLoggedIn?: NavigateOptions;
}) => {
  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserInputs((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const login = useLogin({ navigateOptionAfterSuccessfullyLoggedIn });

  return (
    <S.PageWrapper>
      <Header>
        <S.HeaderTextWrapper>
          <Text fontStyle="heading-3" label={"로그인"} />
        </S.HeaderTextWrapper>
      </Header>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(userInputs);
        }}
      >
        <S.Input value={userInputs.email} id="email" onChange={onChange} />
        <S.Input
          value={userInputs.password}
          id="password"
          onChange={onChange}
        />
        <button type="submit">asdf</button>
      </form>
    </S.PageWrapper>
  );
};

export default LoginPage;
