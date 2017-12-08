import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import LaunchPanel from '../LaunchPanel';
import MissionControl from '../MissionControl';
import StarryNight from '../StarryNight/StarryNight';
import 'normalize.css/normalize.css';
import 'open-color/open-color.css';
import './Application.css';

export default class Application extends Component {
  render() {
    return (
      <Fragment>
        <StarryNight />
        <Switch>
          <Route component={ MissionControl } path="/mc" />
          <Route component={ LaunchPanel } />
        </Switch>
      </Fragment>
    );
  }
}
