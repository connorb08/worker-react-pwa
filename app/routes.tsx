import React from "react";
import { RouteObject, json, useLoaderData } from "react-router-dom";
import { About } from "./components/components";
import { Home } from "./components/components";
import Layout from "./components/layout";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        loader() {
          return json({ message: "Welcome to React Router!" });
        },
        Component() {
          let data: any = useLoaderData();
          return <h1>{data.message}</h1>;
        },
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
];

export default routes;
