import React, { useEffect, useState } from 'react';
import {
  useParams,
  useLocation,
} from "react-router-dom";
import MatchesStateSelector from '../MatchesStateSelector/MatchesStateSelector';
import Card from '../Card/Card.js';
import { getDatas } from "../Utils.js";

export default function GamesLeagues() {
  const [leagues, setLeagues] = useState(null);
  const [state, setState] = useState({});
  let { id } = useParams();
  let { name } = useParams();
  let url = `https://api.pandascore.co/videogames/${id}/leagues?sort=&page=1&per_page=50`;
  useEffect(() => {
    getDatas(url, 'Bearer qp_P-H8KCRKnGn0E-LhSoo7as4aXRT8fQ7QvAOD6iGMDA11UEIU').then(data => {
      setLeagues(data);
    })
    
    return () => {
      setState({});
    };
  }, [url, id]); 

  return(<>
    <div>{leagues === null && "Aucune ligue disponible."}</div>
      <h1>Les ligues de {name}</h1>
      { <div className="leagues">
        {leagues !== null && leagues.map(league => 
          <Card key={league.id} item={league} moreMessage="Voir les matchs" moreLink={`/matchs/${league.name}/${league.id}`}></Card>
        )}
      </div>
    }
  </>)
}