import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import useAuth from "../hooks/useAuth";

export const Route = createFileRoute("/_authenticated")({
    component: RouteComponent,
});

function RouteComponent() {
    return <Outlet />;
}
