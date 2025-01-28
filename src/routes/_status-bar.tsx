import { createFileRoute } from "@tanstack/react-router";
import MobileStatusBar from "../components/layouts/mobile/StatusBar";
import { Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_status-bar")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <>
            <Outlet />
            <MobileStatusBar />
        </>
    );
}
