import type { PropsWithChildren } from 'react'
import { StaticHandlerContext, StaticRouterProvider } from 'react-router-dom/server'

const NOCACHE = process.env.NODE_ENV === 'development'

const Document = (props: PropsWithChildren) => {
    return (
        <html lang="en">
            <head>
                <title>Edge React App</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="UTF-8" />
                <meta name="description" content="Beta version of connorbray.net" />
                <link href={`/build/tailwind.css${NOCACHE ? `?c=${Math.random()}` : ''}`} rel="stylesheet" />
            </head>
            <body>
                <div id="root">{props.children}</div>
                <script src={`/build/client.entry.js${NOCACHE ? `?c=${Math.random()}` : ''}`} async />
            </body>
        </html>
    )
}

const App = (props: PropsWithChildren<{ router: never; context: StaticHandlerContext }>) => {
    return (
        <Document>
            <StaticRouterProvider router={props.router} context={props.context} />
        </Document>
    )
}

export default App
