import { createFileRoute, useNavigate } from "@tanstack/react-router";
import styled from "@emotion/styled";
import Header from "../components/layouts/mobile/Header";

const GererateNewWordSetRouteComponent = () => {
    const navigate = useNavigate();

    const goBack = () => navigate({ to: "/words" });

    return (
        <>
            <Header title="New Word Set Generating" goBack={goBack} />
            <S.MiddleArea>Hello "/words_/new"!</S.MiddleArea>
        </>
    );
};

export const Route = createFileRoute("/words_/new")({
    component: GererateNewWordSetRouteComponent,
});

const S = {
    MiddleArea: styled.div`
        display: flex;
        flex-direction: column;
        gap: 16px;

        width: calc(100% - 32px);
        margin: 20px 16px 0;
    `,
};
