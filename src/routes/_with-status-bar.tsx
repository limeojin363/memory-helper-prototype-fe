import { createFileRoute } from "@tanstack/react-router";
import MobileStatusBar from "../components/general/layouts/mobile/StatusBar";
import { Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_with-status-bar")({
    component: () => (
        <>
            <Outlet />
            <MobileStatusBar />
        </>
    ),
});
