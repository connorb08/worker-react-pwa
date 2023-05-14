import { handleAsset, handleRequest } from "./handler";

const worker: ExportedHandler<Env> = {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    try {

      const response = await handleAsset(request, env, ctx);

      // if (process.env.NODE_ENV === 'development') {
      //   response.headers.set("Cache-Control", "no-cache");
      // }

      if (response.status === 404) {
        console.log('Asset not found, sending to request handler');
        const requestResponse = await handleRequest(request, env, ctx);
        return requestResponse;
      }
      
      return response;

      
    } catch (error) {
      // Return 500 if error is not handled
      console.log(error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};

export default worker;
