import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import MobileStatusBar from "../components/layouts/mobile/StatusBar";
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
            <MobileStatusBar />
            {/* <TanStackRouterDevtools /> */}
        </>
    ),
});
