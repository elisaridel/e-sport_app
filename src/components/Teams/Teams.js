import React, { useEffect, useState } from 'react';
import Paging from '../Paging/Paging';
import {
  Link,
} from "react-router-dom";
import { getDatas } from "../Utils.js";

export default function Teams() {
  const [teams, setTeams] = useState(null);
  const [state, setState] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  let url = `https://api.pandascore.co/teams?sort=&page=${currentPage}&per_page=50`;
  
  useEffect(() => {
    getDatas(url, 'Bearer qp_P-H8KCRKnGn0E-LhSoo7as4aXRT8fQ7QvAOD6iGMDA11UEIU').then(data => {
      setTeams(data);
    })

    return () => {
      setState({});
    };
  }, [url]); 

  const dateTimeConvertor = (dateToConvert) => {
    const date = new Date(dateToConvert);
    if (dateToConvert) {
      return date.toLocaleString('fr-FR', {month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric'});
    } else {
      return "Aucune date renseignée à ce jour";
    }
  };

  return(
    <>
      <div>{teams === null && "Aucune équipe n'est disponible."}</div>
      <h1>Toutes les équipes !</h1>
        { <div className="leagues">
            {teams !== null && teams.map(team => 
              <div className="card-item" key={team.id}>
                <h2>{team.name}</h2>
                <p>{team.current_videogame.name}</p>
                <Link to={`/team/${team.slug}/${team.id}`}>En savoir plus</Link>
              </div>
            )}
          </div>
        }
      <Paging currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </>
  )
}