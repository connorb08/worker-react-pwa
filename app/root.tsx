import React, { PropsWithChildren } from "react";
import { Outlet, Router, RouterProps } from "react-router-dom";
import routes from "./routes";
import { StaticHandlerContext, StaticRouterProvider } from "react-router-dom/server";

const NOCACHE = process.env.NODE_ENV === 'development';

const Document = (props: PropsWithChildren) => {
  return (
    <html>
      <head>
        <title>Edge React App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link href={`/build/tailwind.css${(NOCACHE ? `?c=${Math.random()}` : "")}`} rel="stylesheet" />
      </head>
      <body>
        <div id="root">{props.children}</div>
        <script src={`/build/client.entry.js${(NOCACHE ? `?c=${Math.random()}` : "")}`} />
      </body>
    </html>
  );
};

type AppProps = {
  router: any;
  context: StaticHandlerContext;
}

const App = (props: PropsWithChildren<AppProps>) => {
  return (
    <Document>
      <StaticRouterProvider router={props.router} context={props.context} />
    </Document>
  );
};

export default App;
