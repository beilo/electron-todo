import { BrowserWindow, screen } from 'electron';
import { webPreferencesObj } from './main.dev';

let floatWindow = null;

function createFloatView() {
  floatWindow = new BrowserWindow({
    id: 100,
    width: 107, //悬浮窗口的宽度 比实际DIV的宽度要多2px 因为有1px的边框
    height: 50, //悬浮窗口的高度 比实际DIV的高度要多2px 因为有1px的边框
    type: 'toolbar', //创建的窗口类型为工具栏窗口
    frame: false, //要创建无边框窗口
    resizable: false, //禁止窗口大小缩放
    show: false, //先不让窗口显示
    transparent: true, //设置透明
    alwaysOnTop: true, //窗口是否总是显示在其他窗口之前
    webPreferences: {
      ...webPreferencesObj(),
      devTools: false, //关闭调试工具
      enableRemoteModule: true,
    },
  });
  const size = screen.getPrimaryDisplay().workAreaSize; //获取显示器的宽高
  const winSize = floatWindow.getSize(); //获取窗口宽高

  //设置窗口的位置 注意x轴要桌面的宽度 - 窗口的宽度
  floatWindow.setPosition(size.width - winSize[0], 100);
  floatWindow.loadURL(`file://${__dirname}/app.html#/floatWindow`);
  floatWindow.once('ready-to-show', () => {
    floatWindow.show();
  });
  floatWindow.on('close', () => {
    floatWindow = null;
  });

  floatWindow.webContents.on('did-finish-load', () => {
    if (!floatWindow) {
      throw new Error('"floatWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      floatWindow.minimize();
    } else {
      floatWindow.show();
      floatWindow.focus();
    }
  });
  return floatWindow;
}

export { floatWindow, createFloatView };
