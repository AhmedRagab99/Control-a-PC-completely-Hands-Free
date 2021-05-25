import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Register from './components/RegisterationForm/Register'
import Login from './components/LoginForm/Login'
import WebcamControllingHome from './components/Home/WebcamControllingHome'
import Sidebar from './components/Sidebar';
import SpeechControllingHome from './components/Home/SpeechControllingHome';



function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Login />
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
