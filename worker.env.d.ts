/// <reference types="@cloudflare/workers-types" />

// Required by the worker adapter
declare module '__STATIC_CONTENT' {
    const value: string;
    export default value;
}

interface Env {
    // Required by the worker adapter
    __STATIC_CONTENT: string;
}