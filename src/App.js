import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import { useMediaQuery } from 'react-responsive';
import  Rockets from './pages/rockets';
import  Dragons from './pages/dragons';
import  Launches from './pages/launches';
import Home from './pages/home';
import client from './client/client';
import Nav from './components/nav';
import NavMobile from './components/navMobile';

  const App = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  return (
          <ApolloProvider client={client}>
       {  isTabletOrMobile ? <NavMobile /> : <Nav />}
        <Switch>
        <Route exact path="/">
                <Home />
              </Route>
              <Route path="/rockets">
                <Rockets />
              </Route>
              <Route path="/launches">
                <Launches />
              </Route>
              <Route path="/dragons">
                <Dragons />
              </Route>
                 
            </Switch> 
            </ApolloProvider>
            )}
        export default App; 