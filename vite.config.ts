import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";

const isPackageBuild = process.env.BUILD_MODE === "package";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({ outDir: "dist", clearPureImport: true, rollupTypes: true }),
  ],
  build: {
    lib: isPackageBuild
      ? {
          entry: "src/index.ts",
          name: "ReactMultiselectDropdown",
          formats: ["es", "cjs"],
          fileName: (format) => `index.${format === "es" ? "mjs" : "js"}`,
        }
      : undefined,
    rollupOptions: {
      external: isPackageBuild ? ["react", "react-dom"] : [],
      output: {
        assetFileNames: isPackageBuild
          ? "index.css"
          : "assets/[name].[hash].css",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
