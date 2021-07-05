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
import Option1 from './components/Configuration/WebCamOptions/Option1';
import Option2 from './components/Configuration/WebCamOptions/Option2';
import Option3 from './components/Configuration/WebCamOptions/Option3';
import VoiceOption from './components/Configuration/VoiceOptions/VoiceOptions';


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
          <Route path="/option1">
            <Option1 />
          </Route>
          <Route path="/option2">
            <Option2 />
          </Route>
          <Route path="/option3">
            <Option3 />
          </Route>
          <Route path="/Voption">
            <VoiceOption />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}



export default App;
