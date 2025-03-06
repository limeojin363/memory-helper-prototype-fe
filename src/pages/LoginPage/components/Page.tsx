import { useState } from "react";
import useLogin from "../hooks/useLogin";
import S from "./styled";
import Header from "../../../components/layouts/mobile/Header";

const LoginPage = () => {
    const [userInputs, setUserInputs] = useState({
        email: "",
        password: "",
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setUserInputs((prev) => ({ ...prev, [e.target.id]: e.target.value }));

    const login = useLogin();

    return (
        <S.PageWrapper>
            <Header title="로그인" />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    login(userInputs);
                }}
            >
                <S.Input
                    value={userInputs.email}
                    id="email"
                    onChange={onChange}
                />
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
