const { app, BrowserWindow } = require('electron/main');

const IP_PROXY = process.env.IP_PROXY || '192.168.1.254';
const IP_APP = process.env.IP_APP || '192.168.1.15';
const title = process.env.APP_NAME || 'Electron app';

const createWindow = () => {
  const win = new BrowserWindow({
    show: false,
    title
  });
  win.maximize();
  
	win.webContents.session.setProxy({
	proxyRules: `http://${IP_PROXY}:80,https://${IP_PROXY}:80`
	}, function() {
    win.loadURL(`http://${IP_APP}`);
    win.show();
	});
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
})