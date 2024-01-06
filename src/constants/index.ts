import Devlogger from 'nephrite-dev-logger'

const server = import.meta.env.DEV
    ? import.meta.env.VITE_DEV
    : import.meta.env.VITE_PROD;

const jsonHeaders = {
    "Content-Type": "application/json",
} as const;

export const dev = new Devlogger(import.meta.env.DEV)

export const constants = {
    server,
    jsonHeaders,
};


