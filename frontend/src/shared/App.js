import Home from "../pages/Home"
import AfterConnect from "../pages/AfterConnect"
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import {Header, Card} from "../components/index";



function App() {

  const isLoggedIn = typeof window.ethereum !== 'undefined';
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Header />
        {
          isLoggedIn
          ? <AfterConnect/>
          : <Home />
        }
      </ConnectedRouter>
    </div>
  );
}

export default App;