import {
  getAssetFromKV,
  MethodNotAllowedError,
  NotFoundError,
} from "@cloudflare/kv-asset-handler";

import appRequestHandler from "~/app/server";

const manifest = await import("__STATIC_CONTENT")
  .then((res) => {
    return res;
  })
  .catch((err) => {
    return "{}";
  });

export async function handleRequest(
  request: Request,
  env: Env,
  ctx: ExecutionContext
) {
  return appRequestHandler(request);
}

export async function handleAsset<Env extends { __STATIC_CONTENT: string }>(
  request: Request,
  env: Env,
  ctx: ExecutionContext
): Promise<Response> {
  try {
    return await getAssetFromKV(
      {
        request,
        waitUntil(promise: Promise<any>) {
          return ctx.waitUntil(promise);
        },
      },
      {
        cacheControl(request) {
          const url = new URL(request.url);

          if (url.pathname.startsWith("/build")) {
            return {
              browserTTL: 60 * 60 * 24 * 365,
              edgeTTL: 60 * 60 * 24 * 365,
            };
          }

          return {
            browserTTL: 60 * 10,
            edgeTTL: 60 * 10,
          };
        },
        ASSET_NAMESPACE: env.__STATIC_CONTENT,
        ASSET_MANIFEST: manifest,
      }
    );
  } catch (error) {
    if (
      error instanceof MethodNotAllowedError ||
      error instanceof NotFoundError
    ) {
      return new Response("Not Found", { status: 404 });
    }

    throw error;
  }
}
