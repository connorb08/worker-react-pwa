import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  matchRoutes,
  RouterProvider,
} from "react-router-dom";
import routes from "./routes";
import { startTransition, StrictMode } from "react";
import React from "react";

const hydrate = async () => {
  // let lazyMatches = matchRoutes(routes, window.location)?.filter(
  //   (m) => m.route.lazy
  // );

  // // Load the lazy matches and update the routes before creating your router
  // // so we can hydrate the SSR-rendered content synchronously
  // if (lazyMatches && lazyMatches?.length > 0) {
  //   await Promise.all(
  //     lazyMatches.map(async (m) => {
  //       let routeModule = await m.route.lazy!();
  //       Object.assign(m.route, { ...routeModule, lazy: undefined });
  //     })
  //   );
  // }

  const router = createBrowserRouter(routes);
  const root = document.getElementById("root") || document;

  startTransition(() => {
    ReactDOM.hydrateRoot(
      root,
      <StrictMode>
        <RouterProvider router={router} fallbackElement={null} />
      </StrictMode>
    );
  });
};

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
