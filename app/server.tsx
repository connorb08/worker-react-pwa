import React from "react";
import { renderToReadableStream } from "react-dom/server";
import {
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
} from "react-router-dom/server";
import routes from "./routes";
import Root from "./root";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers
) {
  const handler = createStaticHandler(routes);
  const context = await handler.query(request);

  // Return redirect if context is a redirect
  if (
    context instanceof Response &&
    [301, 302, 303, 307, 308].includes(context.status)
  ) {
    const location = context.headers.get("Location") || "/";
    return Response.redirect(location, context.status);
  } else if (context instanceof Response) {
    return context;
  }

  const router = createStaticRouter(handler.dataRoutes, context);

  const body = await renderToReadableStream(
    <Root>
      <React.StrictMode>
        <StaticRouterProvider router={router} context={context} />
      </React.StrictMode>
    </Root>,
    {
      onError: (error) => {
        responseStatusCode = 500;
        console.error(error);
      },
      signal: request.signal,
    }
  );

  const headers = new Headers(responseHeaders);
  headers.set("Content-Type", "text/html");

  return new Response(body, {
    status: responseStatusCode,
    headers,
  });
}
