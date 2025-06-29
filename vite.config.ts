import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import svgr from "vite-plugin-svgr";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react({
            babel: {
                presets: ["jotai/babel/preset"],
            },
        }),
        svgr(),
        TanStackRouterVite(),
        visualizer({ open: true }), // HTML 리포트 자동 열림
    ],
});
