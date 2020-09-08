import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import { storesContext } from '../Root';
import { ipcRenderer, remote } from 'electron';
import moment from 'moment';
import styles from './float-window.css';
import classNames from 'classnames/bind';
let cx = classNames.bind(styles);

function notification(title: string, body: string) {
  Notification.requestPermission(function (permission) {
    // 如果用户同意，就可以向他们发送通知
    if (permission === 'granted') {
      let notification = new Notification(title, {
        dir: 'auto',
        body: body,
      });
    }
  });
}

export default function Home(): JSX.Element {
  const [count, setCount] = React.useState(0);
  const [date, setDate] = React.useState(0);
  let interval = null;
  React.useEffect(() => {
    ipcRenderer.on('event-todoTime-reply', (event, arg) => {
      notification('开始', '努力工作哦~');
      if (interval) {
        clearInterval(interval);
      }
      const a = moment.duration(arg, 'minutes').valueOf();
      setDate(a);
      interval = setInterval(() => {
        setDate((currDate) => {
          if (currDate <= 0) {
            clearInterval(interval);
            notification('请休息一会儿', '你已经很努力了,休息一会儿吧');
            return 0;
          }
          const temp = moment(currDate);
          temp.subtract(1, 'seconds');
          const valTemp = temp.valueOf();
          ipcRenderer.send('event-tray', moment(valTemp).format('mm:ss'));
          return valTemp;
        });
      }, 1000);
    });
    return () => {
      clearInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    let biasX = 0;
    let biasY = 0;
    let that = this;
    let win = remote.getCurrentWindow();

    document.addEventListener('mousedown', function (e) {
      switch (e.button) {
        case 0:
          biasX = e.x;
          biasY = e.y;
          document.addEventListener('mousemove', moveEvent);
          break;
        case 2:
          // that.$electron.ipcRenderer.send('createSuspensionMenu');
          break;
      }
    });

    document.addEventListener('mouseup', function () {
      biasX = 0;
      biasY = 0;
      document.removeEventListener('mousemove', moveEvent);
    });
    function moveEvent(e) {
      win.setPosition(e.screenX - biasX, e.screenY - biasY);
    }
  }, []);
  React.useEffect(() => {
    document.body.classList.add('body-img');
    return () => {
      document.body.classList.remove('body-img');
    };
  }, []);
  const dateFrom = moment(date).format('mm:ss');
  return (
    <div className={cx('root')}>
      {date ? (
        <span className={cx('text')}> {dateFrom}</span>
      ) : (
        <span className={cx('text')}> 暂未开始</span>
      )}
    </div>
  );
}
