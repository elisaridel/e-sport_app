import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Leagues from '../Leagues/Leagues';
import LeaguesMatch from '../LeaguesMatch/LeaguesMatch';
import Matches from '../Matches/Matches';
import About from '../About';
import Login from "../Login";
import { ReactSession } from 'react-client-session';

export default function Menu() {
  const deleteSession = (event) => {
    event.preventDefault();
    ReactSession.remove("username");
    window.location.reload();
  }

  let session;
  if (ReactSession.get("username") !== undefined) {
    session = <>
      <button onClick={(e) => deleteSession(e)}>Deconnexion</button>
      <li>{ReactSession.get("username")}</li>
    </>;
  } else {
    session = <li><Link to={'/login'} className="nav-link">Login</Link></li>;
  }
  console.log(ReactSession.get("username"));

  return(
  <>
    <Router>
      <ul className="navigation">
        <li><Link to={'/'} className="nav-link"> Home </Link></li>
        <li><Link to={'/matches'} className="nav-link">matchs</Link></li>
        <li><Link to={'/'} className="nav-link">Leagues</Link></li>
        {session}
      </ul>
      <div>
        <Routes>
          <Route path="/matchs/:id" element={<LeaguesMatch ></LeaguesMatch>} />
          <Route path='/' element={<Leagues></Leagues>} />
          <Route path='/login' element={<Login></Login>} />
          <Route path='/matches' element={<Matches></Matches>} />
        </Routes>
      </div>
      </Router>
  </>)
}