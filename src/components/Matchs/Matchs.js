import React, { useEffect, useState } from 'react';
import {
  useParams,
  useLocation,
} from "react-router-dom";
import MatchesStateSelector from '../MatchesStateSelector/MatchesStateSelector';
import Paging from '../Paging/Paging';
import Modal from '../Modal/Modal';
import { getDatas } from "../Utils.js";
import { ReactSession } from 'react-client-session';

export default function Matchs() {
  const [matchs, setMatches] = useState(null);
  const [user, setConnectedUser] = useState(null);
  const [users, getUsers] = useState(null);
  const [state, setState] = useState({});

  const matchStates = {
    ongoing: 'running',
    toCome: 'upcoming',
    finished: 'past'
  };

  const [matchesState, setMatchesState] = useState(matchStates.finished);
  const [currentPage, setCurrentPage] = useState(1);
  let { id } = useParams();
  let url = `https://api.pandascore.co/matches/${matchesState}?sort=&page=${currentPage}&per_page=50`;
  let userId = ReactSession.get("userId");

  useEffect(() => {
    getDatas(url, 'Bearer qp_P-H8KCRKnGn0E-LhSoo7as4aXRT8fQ7QvAOD6iGMDA11UEIU').then(data => {
      setMatches(data);
    })

    getDatas(`http://localhost:4000/profiles`).then(data => {
      getUsers(data);
    })

    getDatas(`http://localhost:4000/profiles/${userId}`).then(data => {
      setConnectedUser(data);
    })
  
    return () => {
      setState({});
    };
  }, [userId, url, id]);

  const getUserBet = (matchId) => {
    if (!user.bet_match) {
      return;
    }
    let bet = user.bet_match.find(bets => bets.match_id === matchId);
    return bet;
  }

  const getTotalBets = (matchId) => {
    let bets = null;
    let i = 0;
    users.map(function(user) {
        bets = user.bet_match.find(bets => bets.match_id === matchId);
        if (bets) {
          i = i + 1;
        }
      }
    );
    return i;
  }

  const dateTimeConvertor = (dateToConvert) => {
      const date = new Date(dateToConvert);
      if (dateToConvert) {
        return date.toLocaleString('fr-FR', {month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric'});
      } else {
        return "Aucune date renseignée à ce jour";
      }
  };

  const getResult = (matchInfo) => {
    if (getUserBet(matchInfo.id)) {
      if (matchInfo.winner !== null) {
        if (matchInfo.winner.id === getUserBet(matchInfo.id).team_id) {
            console.log("gagné ! coins x 2");
          } else {
            console.log("perdu");
          }
      }
    }
  }

  return(
    <>
      <div>{matchs === null && "no leagues available"}</div>
      <h1>Tous les matches !</h1>
      <MatchesStateSelector matchStates={matchStates} setState={setMatchesState} currentMatchState={matchesState} />
        { <div className="leagues">
            {matchs !== null && matchs.map(match =>
              <div className="card-item" key={match.id}>
                <h2>{match.league.name}</h2>
                <p>{match.videogame.name}</p>
                <p>Date: {dateTimeConvertor(match.begin_at)}</p>
                <ul className='opponents'>
                  Opposants:
                  <div className='result'>
                    {(getUserBet(match.id) !== undefined ) ? "Vous avez déjà parié pour une équipe" : ""}
                    <div className='opponent'>
                      <ul>
                        {match.opponents.map(opponent =>
                          <div key={opponent.opponent.id}>
                            {(matchesState !== "past" && getUserBet(match.id) === undefined && ReactSession.get("userId") !== undefined) ? <Modal buttonText="Parier pour cette équipe" teamId={opponent.opponent.id} matchId={match.id}></Modal> : ""}
                            <li>{opponent.opponent.name}</li>
                          </div>
                        )}
                      </ul>
                    </div>
                    {matchesState !== "upcoming" &&
                      <div className='opponent-result'>
                        {match.results.map(result =>
                            <li key={result.team_id}>{result.score}</li>
                        )}
                      </div>
                    }
                    {!getTotalBets(match.id) ? "Aucun paris" : <div>nombre de paris: {getTotalBets(match.id)}</div>}
                    {getResult(match)}
                  </div>
                </ul>
              </div>
            )}
          </div>
        }
      <Paging currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </>
    )
}