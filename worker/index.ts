import { handleAsset, handleRequest } from "./handler";

const worker: ExportedHandler<Env> = {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    try {

      try {
        const response = await handleAsset(request, env, ctx);


        // console.log('STATUS')
        // console.log(response.status);

        if (response.status === 404) {
          console.log('404 STATUS')
          return await handleRequest(request, env, ctx);
        }

        return response;

      } catch {

        return await handleRequest(request, env, ctx);

      }
    

      
    } catch (error) {
      console.log(error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};

export default worker;
