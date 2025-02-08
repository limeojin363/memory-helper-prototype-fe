import { createRootRoute, Outlet } from "@tanstack/react-router";
import emotionReset from "emotion-reset";
import { Global, css } from "@emotion/react";
import { Colors } from "../designs/colors";
import styled from "@emotion/styled";

export const Route = createRootRoute({
    component: () => (
        <>
            <RootLayout>
                <Outlet />
            </RootLayout>
            <Global
                styles={css`
                    ${emotionReset}
                `}
            />
            {/* <TanStackRouterDevtools /> */}
        </>
    ),
});

const RootLayout = styled.div`
    background-color: ${Colors["neutral-light-medium"]};
    
    display: flex;
    flex-direction: column;

    align-items: center;
    height: 100dvh;
`