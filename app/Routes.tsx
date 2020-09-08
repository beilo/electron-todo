/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import Home from './containers/home/Home';
import FloatWindow from './containers/float/FloatWindow';
import SettingData from './containers/setting-data/SettingData';
import Counter from './containers/count/Counter';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route exact path={routes.COUNTER} component={Counter} />
        <Route exact path={routes.FLOATWINDOW} component={FloatWindow} />
        <Route exact path={routes.HOME} component={Home} />
        <Route exact path={routes.SETTINGDATA} component={SettingData} />
      </Switch>
    </App>
  );
}
