import { build } from 'vite'
import { createServer } from 'vite'

/**
 * 启动 Vite 开发服务器
 */
async function startViteServer() {
  const server = await createServer({
    configFile: 'packages/renderer/vite.config.ts',
    mode: 'development',
    plugins: [
      {
        name: 'electron-preload-watcher',
        writeBundle() {
          server.ws.send({ type: 'full-reload' })
        },
      },
    ],
    build: {
      watch: true,
    },
  })

  await server.listen()
  console.log('Vite server is running...')
}

/**
 * 监视 Electron 预加载脚本的变化
 * @type {(server: import('vite').ViteDevServer) => Promise<import('rollup').RollupWatcher>}
 */
function watchPreload(server) {
  return build({
    configFile: 'packages/preload/vite.config.ts',
    mode: 'development',
    plugins: [
      {
        name: 'electron-preload-watcher',
        writeBundle() {
          server.ws.send({ type: 'full-reload' })
        },
      },
    ],
    build: {
      watch: true,
    },
  })
}

// 启动 Vite 服务器并监视预加载脚本
startViteServer().then(server => {
  watchPreload(server)
})
