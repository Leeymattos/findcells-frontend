import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import home from './pages/home'
import register from './pages/register'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={home} exact path='/' />
        <Route component={register} path='/register' />
      </Switch>
    </BrowserRouter>
  )
}