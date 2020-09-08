import React from 'react';
import { useLocalStore, useObserver } from 'mobx-react';
import {
  ButtonGroup,
  Typography,
  Button,
  TextField,
  makeStyles,
  createStyles,
  Box,
} from '@material-ui/core';
import MyAppBar from '../../components/MyAppBar';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import cx from 'classnames';

const Store = require('electron-store');
const storejs = new Store();

function useStore() {
  const s = useLocalStore(() => {
    const initWorkTimeList = storejs.get('workTimeList') || [];
    const initResetTimeList = storejs.get('restTimeList') || [];
    return {
      workTime: '' as number | string,
      restTime: '' as number | string,
      workTimeList: initWorkTimeList as number[],
      restTimeList: initResetTimeList as number[],
      saveWork(val: string) {
        if (!s.workTime) return;
        s.workTimeList.push(Number(s.workTime));
        storejs.set('workTimeList', s.workTimeList);
      },
      delWork() {
        const list = s.workTimeList;
        const index = list.indexOf(Number(s.workTime));
        if (index != -1) {
          list.splice(index, 1);
        }
        s.workTimeList = list;
        storejs.set('workTimeList', list);
      },
      saveRest() {
        if (!s.restTime) return;
        s.restTimeList.push(Number(s.restTime));
        storejs.set('restTimeList', s.restTimeList);
      },
      delRest() {
        const list = s.restTimeList;
        const index = list.indexOf(Number(s.restTime));
        if (index != -1) {
          list.splice(index, 1);
        }
        s.restTimeList = list;
        storejs.set('restTimeList', list);
      },
    };
  });
  return s;
}

const useStyles = makeStyles(() =>
  createStyles({
    h6: {
      marginTop: '10px',
    },
    ml20: {
      marginLeft: '10px',
    },
    form: {
      display: 'flex',
      justifyItems: 'center',
      marginTop: '10px',
    },
  })
);

export default function SettingData() {
  const store = useStore();
  const classes = useStyles();

  return useObserver(() => (
    <MyAppBar title="设置">
      <Typography className={cx(classes.h6)} variant="h6" noWrap>
        工作时间设置
      </Typography>
      <ButtonGroup color="primary">
        {store.workTimeList.length ? (
          store.workTimeList.map((item) => (
            <Button key={item} color="primary">
              {item}分钟
            </Button>
          ))
        ) : (
          <Typography>
            <Box fontStyle="italic" fontSize={16} fontWeight={500}>
              请设置工作时间
            </Box>
          </Typography>
        )}
      </ButtonGroup>
      <form className={cx(classes.form)} noValidate autoComplete="off">
        <TextField
          id="workTime"
          label="新增工作时间"
          size="small"
          variant="outlined"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            store.workTime = event.target.value;
          }}
          value={store.workTime}
        />
        <Button
          className={cx(classes.ml20)}
          variant="contained"
          color="primary"
          size="small"
          startIcon={<SaveIcon />}
          onClick={store.saveWork}
        >
          新增
        </Button>
        <Button
          className={cx(classes.ml20)}
          variant="contained"
          color="secondary"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={store.delWork}
        >
          删除
        </Button>
      </form>

      <Typography className={cx(classes.h6)} variant="h6" noWrap>
        休息时间设置
      </Typography>
      <ButtonGroup color="primary">
        {store.restTimeList.length ? (
          store.restTimeList.map((item) => (
            <Button key={item} color="primary">
              {item}分钟
            </Button>
          ))
        ) : (
          <Typography>
            <Box fontStyle="italic" fontSize={16} fontWeight={500}>
              请设置休息时间
            </Box>
          </Typography>
        )}
      </ButtonGroup>
      <form className={cx(classes.form)} noValidate autoComplete="off">
        <TextField
          id="workTime"
          label="新增休息时间"
          variant="outlined"
          size="small"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            store.restTime = event.target.value;
          }}
          value={store.restTime}
        />
        <Button
          className={cx(classes.ml20)}
          variant="contained"
          color="primary"
          size="small"
          startIcon={<SaveIcon />}
          onClick={store.saveRest}
        >
          新增
        </Button>
        <Button
          className={cx(classes.ml20)}
          variant="contained"
          color="secondary"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={store.delRest}
        >
          删除
        </Button>
      </form>
    </MyAppBar>
  ));
}
