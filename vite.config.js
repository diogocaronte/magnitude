import { resolve } from 'path';
const dev = (process.env.NODE_ENV || 'development') === 'development';

/** @type {import('vite').UserConfig} */
export default {
    base: dev ? '' : '/magnitude',
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
};
