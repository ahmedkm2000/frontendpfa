import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./compenents/Home";
import {BrowserRouter as Router,Routes,Route}from "react-router-dom";
import FuzzyAHPForm from "./compenents/FuzzyAHPForm";
import FuzzyTopsisForm from "./compenents/FuzzyTopsisForm";
import {MapContainer} from "./compenents/MapContainer";
import RegistrationForm from "./compenents/RegistrationForm";
import LoginForm from "./compenents/LoginForm";
import {AuthProvider} from "./compenents/auth";
import {RequireAuth} from "./compenents/RequireAuth";
import Result from "./compenents/Result";
import DetailCalcul from "./compenents/DetailCalcul";
import HiddenFlow from "./compenents/FlowChart";
import WelcomePage from "./compenents/WelcomePage";
import LandingPage from "./compenents/LandingPage";
function App() {

  return (
      <AuthProvider>
    <div className="App">
      <Router>
        <div className="route">
          <Routes>
            <Route exact path="/home" exact element={<RequireAuth><WelcomePage/></RequireAuth>}/>
            <Route exact path="project/create" exact element={<RequireAuth><Home/></RequireAuth>}/>
            <Route exact path="/register" exact element={<RegistrationForm/>}/>
            <Route exact path="/login" exact element={<LoginForm/>}/>
            <Route exact path="/results" exact element={<Result/>}/>
            <Route exact path="/map" exact element={<MapContainer/>}/>
            <Route exact path="/fuzzyAhp" exact element={<RequireAuth><FuzzyAHPForm/></RequireAuth>}/>
            <Route exact path="/fuzzyTopsis" exact element={<FuzzyTopsisForm/>}/>
            <Route exact path="/steps" exact element={<DetailCalcul/>}/>
            <Route exact path="/flow" exact element={<HiddenFlow/>}/>
          </Routes>
        </div>
      </Router>
    </div>
      </AuthProvider>
  );
}

export default App;
