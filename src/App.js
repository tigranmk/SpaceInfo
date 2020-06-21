import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import  Rockets from './pages/rockets';
import  Missions from './pages/missions';
import  Capsules from './pages/capsules';
import  Launches from './pages/launches';
import Home from './pages/home';
import client from './client/client';


  const App = () => (
      <ApolloProvider client={client}>
    <Switch>
    <Route exact path="/">
            <Home />
          </Route>
          <Route path="/rockets">
            <Rockets />
          </Route>
          <Route path="/topics">
            <Launches />
          </Route>
          <Route path="/capsules">
            <Capsules />
          </Route>
              <Route path="/missions">
            <Missions />
          </Route>
        </Switch> 
        </ApolloProvider>
        )
        export default App; 