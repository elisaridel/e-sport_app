import React, { useEffect, useState } from 'react';
import Paging from '../Paging/Paging';
import {
  Link,
} from "react-router-dom";
import {
  useParams,
  useLocation,
} from "react-router-dom";
import DefaultProfile from '../../assets/images/DefaultProfile.png';
import { getDatas } from "../Utils.js";

export default function TeamInformation() {
  const [team, setTeam] = useState(null);
  let { id } = useParams();
  let { name } = useParams();
  const location = useLocation();
  const props = location.state;
  let url = `https://api.pandascore.co/teams/${id}`;
  const [state, setState] = useState({});

  const dateTimeConvertor = (dateToConvert) => {
      const date = new Date(dateToConvert);
      if (dateToConvert) {
        return date.toLocaleString('fr-FR', {month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric'});
      } else {
        return "Aucune date renseignée à ce jour";
      }
  };

  useEffect(() => {
    getDatas(url, 'Bearer qp_P-H8KCRKnGn0E-LhSoo7as4aXRT8fQ7QvAOD6iGMDA11UEIU').then(data => {
      setTeam(data);
    })

    return () => {
      setState({});
    };
  }, [url, id]);

  return(
    <>
      <div>{team === null && "Chargement en cours."}</div>
      {team !== null &&
        <div className='team-information'>
          <h1>{team.name}</h1>
          <p>{team.current_videogame.name}</p>
          <div className='players'>
            {team.players !== null && team.players.map(player => 
              <div className='player card-item' key={player.id}>
                {player.image_url ? <img className="league-item-image" src={player.image_url} alt={player.name} /> : <img src={DefaultProfile} alt={player.name} />}
                <h2>{player.name}</h2>
                <h3>{player.first_name} {player.last_name}</h3>
                {player.nationality !== null && <p>Nationnalité: {player.nationality}</p>}
              </div>
            )}
          </div>
        </div>
      }
    </>
  )
}