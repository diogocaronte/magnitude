import { resolve } from 'path';
const dev = (process.env.NODE_ENV || 'development') === 'development';

/** @type {import('vite').UserConfig} */
export default {
    base: dev ? '' : '/magnitude',

    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
        },
    },

    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
};
