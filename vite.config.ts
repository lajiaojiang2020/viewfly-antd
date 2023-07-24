import { resolve } from 'path'
import { defineConfig } from 'vite'


export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@antd/viewfly/icon': resolve(__dirname, './src/viewfly-icon'),
            '@antd/viewfly/ui': resolve(__dirname, './src/viewfly-antd'),
        }
    }
})