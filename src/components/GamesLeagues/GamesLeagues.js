import React, { useEffect, useState } from 'react';
import {
  useParams,
  useLocation,
} from "react-router-dom";
import MatchesStateSelector from '../MatchesStateSelector/MatchesStateSelector';
import Card from '../Card/Card.js';

export default function GamesLeagues() {
  const [leagues, setLeagues] = useState(null);
  let { id } = useParams();
  let { name } = useParams();
  let url = `https://api.pandascore.co/videogames/${id}/leagues?sort=&page=1&per_page=50`;
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
        setLeagues(data);
      });
  }, [url, id]); 

  return(<>
    <div>{leagues === null && "Aucune ligue disponible."}</div>
      <h1>Les ligues de {name}</h1>
      { <div className="leagues">
        {leagues !== null && leagues.map(league => 
          <Card item={league} moreMessage="Voir les matchs" moreLink={`/matchs/${league.name}/${league.id}`}></Card>
        )}
      </div>
    }
  </>)
}