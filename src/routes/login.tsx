import { createFileRoute } from "@tanstack/react-router";
import LoginPage from "../pages/Login/components/Page";

export const Route = createFileRoute("/login")({
    component: LoginPage,
});
