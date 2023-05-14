import React, { PropsWithChildren } from "react";

const Root = (props: PropsWithChildren) => {
  return (
    <html>
      <head>
        <title>Edge React App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </head>
      <body>
        <div id="root">
          {props.children}
        </div>
      </body>
    </html>
  );
};

export default Root;
