import { app } from 'electron'
import * as path from 'path'

app.on('ready', () => {
  require(path.join(__dirname, 'main.js'))
})
