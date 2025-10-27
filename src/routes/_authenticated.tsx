import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import useAuth from "../hooks/useAuth";

export const Route = createFileRoute("/_authenticated")({
    component: RouteComponent,
});

function RouteComponent() {
    const { isLoggedIn } = useAuth();
    if (!isLoggedIn) return <Navigate to="/login" />;

    return <Outlet />;
}
