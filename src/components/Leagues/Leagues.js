import React from 'react';
import {
  Link,
} from "react-router-dom";

export default class Leagues extends React.Component {
  constructor(props) {
    super()
    this.state = {
      leagues: []
    }
  }

  componentDidMount() {
    const options = {
      methode: 'GET', 
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer qp_P-H8KCRKnGn0E-LhSoo7as4aXRT8fQ7QvAOD6iGMDA11UEIU',
      }
    };

    fetch('https://api.pandascore.co/leagues?sort=&page=1&per_page=50', options)
    .then(response => response.json())
    .then(data => {
      this.setState({
      leagues: data
    })
    })
  };

  render () {
    return (
      <div className='leagues-page'>
        <div>{this.state.leagues.length === 0 && "no leagues available"}</div>
        <div className='leagues'>
          {this.state.leagues.length > 0 && this.state.leagues.map(league => 
          <div className="league-item">
            <img className="league-item-image" src={league.image_url} alt={league.name} />
            <h2>{league.name}</h2>
            <p>{league.videogame.name}</p>
            <Link to={`/matchs/${league.id}`} state={{ leagueName: league.name }}>Voir les matchs</Link>
            <Link to={`/players/${league.id}`} state={{ leagueName: league.name }}>Voir les joueurs</Link>
          </div>
          )}
        </div>
      </div>
    )
  }
}