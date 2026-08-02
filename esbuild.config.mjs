import { mkdir, rm, writeFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { build, context } from "esbuild"

const watch = process.argv.includes("--watch")
const rootDir = fileURLToPath(new URL(".", import.meta.url))

if (!watch) {
  await rm(new URL("dist", import.meta.url), { recursive: true, force: true })
}

await mkdir(new URL("dist/cjs", import.meta.url), { recursive: true })
await writeFile(new URL("dist/cjs/package.json", import.meta.url), '{"type":"commonjs"}\n')

const sharedOptions = {
  absWorkingDir: rootDir,
  bundle: true,
  external: ["react", "react-dom"],
  jsx: "automatic",
  logLevel: "info",
  platform: "browser",
  sourcemap: true,
  target: "es2020",
}

const builds = [
  {
    ...sharedOptions,
    chunkNames: "chunk-[hash]",
    entryPoints: {
      index: "src/index.ts",
      vanilla: "src/vanilla.ts",
    },
    format: "esm",
    outdir: "dist",
    splitting: true,
  },
  {
    ...sharedOptions,
    entryPoints: {
      index: "src/index.ts",
      vanilla: "src/vanilla.ts",
    },
    format: "cjs",
    outdir: "dist/cjs",
  },
]

if (watch) {
  const contexts = await Promise.all(builds.map((options) => context(options)))
  await Promise.all(contexts.map((buildContext) => buildContext.watch()))
  console.log("Watching JavaScript bundles for changes...")
} else {
  await Promise.all(builds.map((options) => build(options)))
}
