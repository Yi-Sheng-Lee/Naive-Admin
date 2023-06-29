import { defineConfig, loadEnv } from 'vite'

import { convertEnv, getSrcPath, getRootPath } from './build/utils'
import { createViteProxy, viteDefine } from './build/config'
import { createVitePlugins } from './build/plugin'

export default defineConfig(({ command, mode }) => {
    const srcPath = getSrcPath()
    const rootPath = getRootPath()
    const isBuild = command === 'build'

    const env = loadEnv(mode, process.cwd())
    const viteEnv = convertEnv(env)
    const { VITE_PORT, VITE_PUBLIC_PATH, VITE_USE_PROXY, VITE_PROXY_TYPE, VITE_OUTPUT_DIR } =
        viteEnv

    return {
        base: VITE_PUBLIC_PATH || '/',
        resolve: {
            alias: {
                '~': rootPath,
                '@': srcPath,
            },
        },
        define: viteDefine,
        plugins: createVitePlugins(viteEnv, isBuild),
        server: {
            host: '0.0.0.0',
            port: VITE_PORT,
            open: false,
            proxy: createViteProxy(VITE_USE_PROXY, VITE_PROXY_TYPE),
        },
        build: {
            target: 'es2015',
            outDir: VITE_OUTPUT_DIR,
            reportCompressedSize: false, // 啟用／停止 gzip 壓縮大小報告
            chunkSizeWarningLimit: 1024, // chunk 大小警告的限制（kb）
        },
    }
})
