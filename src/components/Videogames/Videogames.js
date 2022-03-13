import React from 'react';
import {
  Link,
} from "react-router-dom";
import Card from '../Card/Card.js';

export default class Videogame extends React.Component {
  constructor(props) {
    super()
    this.state = {
      videogames: []
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

    fetch('https://api.pandascore.co/videogames?page=1&per_page=50', options)
    .then(response => response.json())
    .then(data => {
      this.setState({
      videogames: data
    })
    })
  };

  render () {
    return (
      <div className='leagues-page'>
        <h1>Les jeux vidéos.</h1>
        <div>{this.state.videogames.length === 0 && "no leagues available"}</div>
        <div className='leagues'>
          {this.state.videogames.length > 0 && this.state.videogames.map(game => 
          <div className="card-item">
            <h2>{game.name}</h2>
            <Link to={`/ligues/${game.name}/${game.id}`}>Voir les ligues</Link>
          </div>
          )}
        </div>
      </div>
    )
  }
}