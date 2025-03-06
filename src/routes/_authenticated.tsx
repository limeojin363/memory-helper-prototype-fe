import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import useAuth from "../hooks/useAuth";

export const Route = createFileRoute("/_authenticated")({
    component: RouteComponent,
});

function RouteComponent() {
    const { isLoginned } = useAuth();

    // TODO: Uncomment this code to enable authentication
    // if (!isLoginned) {
    //     return <Navigate to="/login" />;
    // }

    return <Outlet />;
}
