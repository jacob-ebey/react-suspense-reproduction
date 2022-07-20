import * as esbuild from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

await Promise.all([
  esbuild.build({
    entryPoints: ["./src/entry.client.tsx"],
    format: "esm",
    outfile: "public/script.js",
    bundle: true,
    define: {
      "process.env.NODE_ENV": JSON.stringify("development"),
    },
  }),
  esbuild.build({
    entryPoints: ["./src/entry.server.tsx"],
    format: "esm",
    outfile: "dist/server.js",
    platform: "node",
    bundle: true,
    plugins: [nodeExternalsPlugin()],
  }),
]);
