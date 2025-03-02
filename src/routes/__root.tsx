import { createRootRoute, Outlet } from "@tanstack/react-router";
import emotionReset from "emotion-reset";
import { Global, css } from "@emotion/react";
import { Colors } from "../designs/colors";
import styled from "@emotion/styled";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

export const Route = createRootRoute({
    component: () => (
        <QueryClientProvider client={queryClient}>
            <RootLayout>
                <Outlet />
            </RootLayout>
            <Global
                styles={css`
                    ${emotionReset}
                `}
            />
            {/* <TanStackRouterDevtools /> */}
        </QueryClientProvider>
    ),
});

const RootLayout = styled.div`
    background-color: ${Colors["neutral-light-medium"]};

    display: flex;
    flex-direction: column;

    align-items: center;
    height: 100dvh;
`;
