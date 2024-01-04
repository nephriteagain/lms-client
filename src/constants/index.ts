const server = import.meta.env.DEV ? import.meta.env.VITE_DEV : import.meta.env.VITE_PROD

export const constants = {
    server
}