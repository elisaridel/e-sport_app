import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Leagues from '../Leagues/Leagues';
import Videogames from '../Videogames/Videogames';
import LeaguesMatch from '../LeaguesMatch/LeaguesMatch';
import GamesLeagues from '../GamesLeagues/GamesLeagues';
import Matchs from '../Matchs/Matchs';
import About from '../About';
import Login from "../LoginForm/Login";
import { ReactSession } from 'react-client-session';
import Teams from "../Teams/Teams";
import TeamInformation from "../TeamInformation/TeamInformation";
import RegisterForm from "../RegisterForm/RegisterForm";
import Button from '../Button/Button';

export default function Menu() {
  const deleteSession = (event) => {
    event.preventDefault();
    ReactSession.remove("userId");
    window.location.reload();
  }

  let session;
  if (ReactSession.get("userId") !== undefined) {
    session = <>
      <Button click={(e) => deleteSession(e)} buttonText="Deconnexion" />
    </>;
  } else {
    session = <li><Link to={'/login'} className="nav-link">Login</Link></li>;
  }

  return(
  <>
    <Router>
      <ul className="navigation">
        <li><Link to={'/'} className="nav-link"> Home </Link></li>
        <li><Link to={'/matches'} className="nav-link">matchs</Link></li>
        <li><Link to={'/'} className="nav-link">Jeux</Link></li>
        <li><Link to={'/teams'} className="nav-link">Equipes</Link></li>
        {session}
      </ul>
      <div>
        <Routes>
          <Route path="/matchs/:name/:id" element={<LeaguesMatch />} />
          <Route path="/ligues/:name/:id" element={<GamesLeagues />} />
          <Route path='/' element={<Videogames />} />
          <Route path='/login' element={<Login />} />
          <Route path='/matches' element={<Matchs />} />
          <Route path='/teams' element={<Teams />} />
          <Route path='/team/:name/:id' element={<TeamInformation />} />
          <Route path='/register' element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
  </>)
}