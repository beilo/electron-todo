import getAssetPath from './asset-path-util';
import { Tray } from 'electron';

const { menubar } = require('menubar');

let tray = null;

let mb = null;

function createMb() {
  tray = new Tray(getAssetPath('icon1.png'));
  mb = menubar({
    tooltip: '要加油哦',
    browserWindow: {
      width: 0,
      height: 0,
    },
    tray,
    showDockIcon: true,
  });
  return { mb, tray };
}

export { mb, tray, createMb };
