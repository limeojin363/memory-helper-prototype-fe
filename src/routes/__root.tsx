import { createRootRoute, Outlet } from "@tanstack/react-router";
import emotionReset from "emotion-reset";
import { Global, css } from "@emotion/react";

export const Route = createRootRoute({
    component: () => (
        <>
            <Outlet />
            <Global
                styles={css`
                    ${emotionReset}
                `}
            />
            {/* <TanStackRouterDevtools /> */}
        </>
    ),
});
