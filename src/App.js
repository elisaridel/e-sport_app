import Leagues from './components/Leagues/Leagues';
import LeaguesMatch from './components/LeaguesMatch/LeaguesMatch';
import ReactDOM from "react-dom";
import About from './components/About';
import Menu from './components/Menu/Menu';
import { ReactSession } from 'react-client-session';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function App() {
  ReactSession.setStoreType("sessionStorage");

  return (
    <div className="App">
      {/* <Leagues></Leagues> */}
      <Menu></Menu>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
export default App;
//Utiliser formik pour les formulaires.
//npx json-server pour pouvoir gérer le formulaire de connexion
//mvp.css