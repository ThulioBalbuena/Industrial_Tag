import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

import Home from './pages/Home'
import QRgen from './pages/QRgenerator'
import QRscan from './pages/QRscanner'
import Ident from './pages/Identifier'
import Stock from './pages/Stock'
import React from 'react';

function App() {
  return (
    <div className="App">
      <div className="App-header">
      
        <Router>
          <div>

            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
              <Route path="/qr_generator">
                <QRgen/>
              </Route>
              <Route path="/qr_scanner">
                <QRscan/>
              </Route>
              <Route path="/identifier">
                <Ident/>
              </Route>
              <Route>
                <Stock/>
              </Route>
            </Switch>
          </div>
        </Router>

      </div>
    </div>
  );
}

export default App;
