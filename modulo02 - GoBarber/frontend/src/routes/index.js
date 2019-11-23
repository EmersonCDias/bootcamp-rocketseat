import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/resgister" component={SignUp} />
      <Route path="/profile" component={Profile} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  );
}
