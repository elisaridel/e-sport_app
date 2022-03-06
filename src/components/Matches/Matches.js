import React, { useEffect, useState } from 'react';
import {
  useParams,
  useLocation,
} from "react-router-dom";
import MatchesStateSelector from '../MatchesStateSelector/MatchesStateSelector';

export default function LeaguesMatch() {
  const [matches, setMatches] = useState(null);

  const matchStates = {
    ongoing: 'running',
    toCome: 'upcoming',
    finished: 'past'
  };

  const [matchesState, setMatchesState] = useState(matchStates.finished);
  let { id } = useParams();
  let url = `https://api.pandascore.co/matches/${matchesState}?sort=&page=1&per_page=50`;

  useEffect(() => {
    const options = {
      methode: 'GET', 
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer qp_P-H8KCRKnGn0E-LhSoo7as4aXRT8fQ7QvAOD6iGMDA11UEIU',
      }
    };

    fetch(url, options)
      .then((resp) => resp.json())
      .then((data) => {
        setMatches(data);
      });
  }, [url, id]); 

  const dateTimeConvertor = (dateToConvert) => {
      const date = new Date(dateToConvert);

      return date.toLocaleString('fr-FR', {month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric'});
  };
  console.log(matches);
  return(<>
    <div>{matches === null && "no leagues available"}</div>
      <h1>Tous les matches !</h1>
      <MatchesStateSelector matchStates={matchStates} setState={setMatchesState} currentMatchState={matchesState} />
      { <div className="leagues">
        {matches !== null && matches.map(league => 
          <div className="league-item">
            <h2>{league.league.name}</h2>
            <p>{league.videogame.name}</p>
            <p>Date: {dateTimeConvertor(league.begin_at)}</p>
            <ul className='opponents'>
              <p>Opposants:</p>
              {league.opponents.map(opponent =>
                <li>{opponent.opponent.name}</li>
              )}
            </ul>
          </div>
        )}
      </div>
    }
  </>)
}