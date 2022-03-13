import React, { useEffect, useState } from 'react';
import {
  useParams,
  useLocation,
} from "react-router-dom";
import {
  Link,
} from "react-router-dom";
import './Card.scss';

export default function Card(props) {
  const dateTimeConvertor = (dateToConvert) => {
    const date = new Date(dateToConvert);

    return date.toLocaleString('fr-FR', {month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric'});
  };

  return(<>
        <div className={`card-item big`}>
          {props.item.image_url ? <img className="league-item-image" src={props.item.image_url} alt={props.item.name} /> : ""}
          <h2>{props.item.name}</h2>
          {props.item.name ? <p>{props.item.name}</p> : ""}
          {props.item.begin_at ? <p>Date: {dateTimeConvertor(props.item.begin_at)}</p> : ""}
          {props.moreLink ? <Link to={props.moreLink} title={props.item.name}>{props.moreMessage}</Link> : ""}
          {/* <Link to={`/players/${league.id}`} state={{ leagueName: league.name }}>Voir les joueurs</Link> */}
        </div>
  </>)
}