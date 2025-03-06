import { createFileRoute } from "@tanstack/react-router";
import LoginPage from "../pages/LoginPage/components/Page";

export const Route = createFileRoute("/login")({
    component: LoginPage,
});
