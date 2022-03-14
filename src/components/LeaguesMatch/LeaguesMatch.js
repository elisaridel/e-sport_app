import React, { useEffect, useState } from 'react';
import {
  useParams,
  useLocation,
} from "react-router-dom";
import MatchesStateSelector from '../MatchesStateSelector/MatchesStateSelector';
import './LeaguesMatch.scss';
import Card from '../Card/Card.js';
import { getDatas } from "../Utils.js";

export default function LeaguesMatch() {
  const [matches, setMatches] = useState(null);

  const matchStates = {
    ongoing: 'running',
    toCome: 'upcoming',
    finished: 'past'
  };

  const [matchesState, setMatchesState] = useState(matchStates.finished);
  const [state, setState] = useState({});
  let { id } = useParams();
  let { name } = useParams();
  const location = useLocation();
  const props = location.state;
  let url = `https://api.pandascore.co/leagues/${id}/matches/${matchesState}?sort=&page=1&per_page=50`;

  useEffect(() => {
    getDatas(url, 'Bearer qp_P-H8KCRKnGn0E-LhSoo7as4aXRT8fQ7QvAOD6iGMDA11UEIU').then(data => {
      setMatches(data);
    })
    
    return () => {
      setState({});
    };
  }, [url, id]); 

  return(<>
    <div>{matches === null && "Aucun match disponible"}</div>
      <h1>Les matchs de {name}</h1>
      <MatchesStateSelector matchStates={matchStates} setState={setMatchesState} currentMatchState={matchesState} />
      { <div className="leagues">
        {matches !== null && matches.map(match => 
          <Card key={match.id} item={match}></Card>
        )}
      </div>
    }
  </>)
}