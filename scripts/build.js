import * as esbuild from "esbuild";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const productionBuilds = [
  {
    name: "Build worker",
    build: {
      entryPoints: ["./worker/index.ts"],
      bundle: true,
      minify: IS_PRODUCTION,
      sourcemap: !IS_PRODUCTION,
      format: "esm",
      metafile: true,
      external: ["__STATIC_CONTENT_MANIFEST"],
      outfile: "./dist/index.js",
      define: {
        'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
    },
    },
  },
  {
    name: "Build client entry",
    build: {
      entryPoints: ["./app/client.entry.tsx"],
      bundle: true,
      minify: IS_PRODUCTION,
      sourcemap: !IS_PRODUCTION,
      format: "esm",
      metafile: true,
      outfile: "./public/build/client.entry.js",
      define: {
        'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
    },
    },
  },
];

async function build() {

  const results = [];
  const startTime = Date.now();

  console.log((IS_PRODUCTION) ? "Building in production..." : "Building in development...")

  for (const buildStep of productionBuilds) {
    await esbuild.build(buildStep.build).then((res) => {
      results.push(res);
      console.log(`${buildStep.name} finished.`)
    }).catch((error) => {
      console.log(error);
    })
  }

  const endTime = Date.now();
  console.log(`Built in ${endTime - startTime}ms`);

}

build().catch((e) => console.error("Unknown error caught during build:", e));
