import crypto from 'crypto'
import electron, { app } from 'electron'
import process from 'process'

export const isInDev = (): boolean => {
  // https://github.com/sindresorhus/electron-is-dev/blob/main/index.js
  const isEnvSet = 'ELECTRON_IS_DEV' in process.env
  const getFromEnv = Number.parseInt(process.env.ELECTRON_IS_DEV as string, 10) === 1
  return isEnvSet ? getFromEnv : !electron.app.isPackaged
}

export const reload = (): void => {
  app.quit()
  app.relaunch()
}
