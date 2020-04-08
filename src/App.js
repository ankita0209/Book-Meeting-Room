import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from './component/store';
import Grid from '@material-ui/core/Grid';
import './App.css';
import StepOne from './component/container/stepOne';
import StepTwo from './component/container/stepTwo';
const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <div style={{ backgroundColor: '#b31b1b', width: '100%', height: 40 }} />
          <Grid>
            <h4>Book your Meeting Room</h4>
          </Grid>
          <Switch>
            <Route path="/" component={StepOne} exact />
            <Route path="/step-2" component={StepTwo} />
          </Switch>
        </header>
      </div>
    </Provider>
  );
}

export default App;
