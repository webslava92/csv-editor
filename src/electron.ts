/* eslint-disable no-console */
/* eslint-disable global-require */
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';
// import electronReload from 'electron-reload';

let win: any;
const ipc = ipcMain;

// if (isDev) {
//   electronReload(__dirname, {});
// }

function createWindow() {
  win = new BrowserWindow({
    width: isDev ? 1000 : 500,
    height: 650,
    minWidth: 500,
    minHeight: 650,
    resizable: true,
    movable: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: !!isDev,
    },
  });

  if (isDev) { win.webContents.openDevTools(); }

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

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
    } else win.maximize();
  });

  ipc.on('closeApp', () => {
    win.close();
  });
}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
