const server = import.meta.env.DEV
    ? import.meta.env.VITE_DEV
    : import.meta.env.VITE_PROD;

const jsonHeaders = {
    "Content-Type": "application/json",
} as const;

export const constants = {
    server,
    jsonHeaders: jsonHeaders,
};
