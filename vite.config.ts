import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from 'vite-tsconfig-paths';

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
        tsconfigPaths(),
    ],
});
