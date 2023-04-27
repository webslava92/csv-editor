

const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
/* eslint-disable global-require */
const electron_1 = require('electron');
const path_1 = __importDefault(require('path'));
const electron_is_dev_1 = __importDefault(require('electron-is-dev'));
const electron_reload_1 = __importDefault(require('electron-reload'));

let win;
const ipc = electron_1.ipcMain;
if (electron_is_dev_1.default) {
  (0, electron_reload_1.default)(__dirname, {});
}
function createWindow() {
  win = new electron_1.BrowserWindow({
    width: electron_is_dev_1.default ? 1000 : 500,
    height: 650,
    minWidth: 500,
    minHeight: 650,
    resizable: true,
    movable: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: !!electron_is_dev_1.default,
    },
  });
  if (electron_is_dev_1.default) {
    win.webContents.openDevTools();
  }
  win.loadURL(electron_is_dev_1.default
    ? 'http://localhost:3000'
    : `file://${path_1.default.join(__dirname, '../build/index.html')}`);
  win.on('closed', () => {
    win = null;
  });
  win.on('maximize', () => {
    win.webContents.send('isMaximized');
  });
  win.on('unmaximize', () => {
    win.webContents.send('isRestored');
  });
  ipc.on('minimizeApp', () => {
    win.minimize();
  });
  ipc.on('maximizeRestoreApp', () => {
    if (win.isMaximized()) {
      win.restore();
    } else { win.maximize(); }
  });
  ipc.on('closeApp', () => {
    win.close();
  });
}
electron_1.app.whenReady().then(() => {
  createWindow();
});
electron_1.app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    electron_1.app.quit();
  }
});
electron_1.app.on('activate', () => {
  if (electron_1.BrowserWindow.getAllWindows().length === 0) { createWindow(); }
});
// # sourceMappingURL=electron.js.map
