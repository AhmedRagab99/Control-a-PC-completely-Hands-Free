import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Register from './components/RegisterationForm/Register'
import Login from './components/LoginForm/Login'
import WebcamControllingHome from './components/Home/WebcamControllingHome'
import SpeechControllingHome from './components/Home/SpeechControllingHome';
import Configuration from './components/Configuration/Configuration';
import DefaultHome from './components/Home/DefaultHome';
import Default from './components/Configuration/Default';
import Setup from './components/Configuration/Setup';



function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route exact path="/setconfg">
            <Setup/>
          </Route>
          <Route exact path="/defaultconfg">
            <Default/>
          </Route>
          <Route exact path="/home">
            <DefaultHome />
          </Route>
          <Route exact path="/configuration">
            <Configuration />
          </Route>
          <Route exact path="/speech">
            <SpeechControllingHome />
          </Route>
          <Route exact path="/webcam">
            <WebcamControllingHome />
          </Route>   
          <Route path="/register">
            <Register />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}



export default App;
