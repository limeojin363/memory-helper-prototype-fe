import { createRootRoute, Outlet } from "@tanstack/react-router";
import emotionReset from "emotion-reset";
import { Global, css } from "@emotion/react";
import { Colors } from "../designs/colors";
import styled from "@emotion/styled";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DevTools } from "jotai-devtools";
import "jotai-devtools/styles.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: Infinity,
            staleTime: Infinity,
        },
    },
});

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
            <DevTools />
            <ReactQueryDevtools />
        </QueryClientProvider>
    ),
});

const RootLayout = styled.div`
    background-color: ${Colors["neutral-light-medium"]};

    display: flex;
    flex-direction: column;

    align-items: center;
    min-height: 100dvh;
`;
