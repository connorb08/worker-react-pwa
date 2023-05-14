import * as esbuild from "esbuild";

async function build() {
  const res1 = new Promise(async (resolve, reject) => {
    try {
      const startTime = Date.now();
      const result = await esbuild.build({
        entryPoints: ["./worker/index.ts"],
        bundle: true,
        minify: false,
        sourcemap: true,
        format: "esm",
        metafile: true,
        external: ["__STATIC_CONTENT"],
        outfile: "./dist/index.js",
      });
      const endTime = Date.now();
      console.log(`Built in ${endTime - startTime}ms`);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });

  // const res2 = new Promise(async (resolve, reject) => {
  //   try {
  //     const startTime = Date.now();
  //     const result = await esbuild.build({
  //       entryPoints: ["./app/client.entry.tsx"],
  //       bundle: true,
  //       minify: false,
  //       sourcemap: true,
  //       format: "esm",
  //       metafile: true,
  //       outfile: "./build/client.entry.js",
  //     });
  //     const endTime = Date.now();
  //     console.log(`Built in ${endTime - startTime}ms`);
  //     resolve(result);
  //   } catch (error) {
  //     reject(error);
  //   }
  // });

  const [server] = await Promise.all([res1])
}

build().catch((e) => console.error("Unknown error caught during build:", e));
