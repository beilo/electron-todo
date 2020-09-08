import { observable, action, computed } from 'mobx';
import { ipcRenderer } from 'electron';
const Store = require('electron-store');
const storejs = new Store();

export default class TodoTimeStore {
  @observable
  time = 25;
  @observable
  workTimeList: number[] = [];
  @observable
  restTimeList: number[] = [];

  @action.bound
  onTime(val) {
    this.time = val;
    ipcRenderer.send('event-todoTime', val);
  }

  @action.bound
  init() {
    this.workTimeList = storejs.get('workTimeList') || [];
    this.restTimeList = storejs.get('restTimeList') || [];
  }
}
