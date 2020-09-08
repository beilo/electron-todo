import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import { storesContext } from '../Root';
import TodoTimeStore from '../../store/todo-time';
import { useLocalStore, useObserver } from 'mobx-react';
const { ipcRenderer } = require('electron');

import cx from 'classnames';
import {
  ButtonGroup,
  Button,
  TextField,
  makeStyles,
  createStyles,
  Typography,
  Box,
} from '@material-ui/core';
import MyAppBar from '../../components/MyAppBar';

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

export default function Home(): JSX.Element {
  const todoTimeStore = useLocalStore(() => {
    const todoTime = new TodoTimeStore();
    todoTime.init();
    return todoTime;
  });
  const classes = useStyles();
  return useObserver(() => (
    <MyAppBar title="首页">
      <Typography className={cx(classes.h6)} variant="h6" noWrap>
        工作时间
      </Typography>
      <ButtonGroup color="primary">
        {todoTimeStore.workTimeList.length ? (
          todoTimeStore.workTimeList.map((item) => (
            <Button
              onClick={() => {
                todoTimeStore.onTime(item);
              }}
            >
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
      <Typography className={cx(classes.h6)} variant="h6" noWrap>
        休息时间
      </Typography>
      <ButtonGroup color="primary">
        {todoTimeStore.restTimeList.length ? (
          todoTimeStore.restTimeList.map((item) => (
            <Button
              onClick={() => {
                todoTimeStore.onTime(item);
              }}
            >
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
    </MyAppBar>
  ));
}
