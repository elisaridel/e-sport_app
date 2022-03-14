import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getDatas } from "../Utils.js";
import Button from '../Button/Button';
import { ReactSession } from 'react-client-session';

export default class Modal extends React.Component {
  constructor(props) {
    super()
    this.state = {
      isOpen: false,
      user: [],
    }
  }

  userId = ReactSession.get("userId");

  openModal (e) {
    this.setState({isOpen: true});
  }

  closeModal (e) {
    this.setState({isOpen: false});
  }

  componentDidMount() {
    getDatas(`http://localhost:4000/profiles/${this.userId}`).then(data => {
      this.setState({user: data});
    })
  }

  addBet (coins) {
    this.state.user.bet_match.push({match_id: this.props.matchId, bet_coins: coins, team_id: this.props.teamId})
    fetch(`http://localhost:4000/profiles/${this.userId}`, {
      method: 'put',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: this.state.user.id,
        pseudo: this.state.user.pseudo,
        password: this.state.user.password,
        coins: this.state.user.coins - coins,
        bet_match: this.state.user.bet_match
      })
    })
    .then(response => {       
      if (response.ok) {
        window.location.href="/matches";
      } else {
        throw new Error('Something went wrong ...');
      }
    })
  }

  render () {
    return (
      <>
        <Button click={(e) => this.openModal(e)} buttonText={this.props.buttonText} />
        <div className={`${this.state.isOpen === true ? "open" : "close"}`}>
          <div className='modal-content'>
            <div onClick={(e) => this.closeModal(e)}  className='close-button'>x</div>
            <div className='opponents'>
              <Formik
                initialValues={{ bet: ''}}
                validate={values => {
                  const errors = {};
                  if (!values.bet) {
                    errors.bet = 'Vous devez renseigner une mise.';
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(false);
                  this.addBet(values.bet);
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="form">
                    <Field className="input-field" type="number" max={this.state.user.coins} min="1" name="bet"/>
                    <ErrorMessage className="error-message" name="bet" component="div" />
                    <Button disabled={isSubmitting} type="submit" buttonText="Parier pour cette équipe !"></Button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </>
    )
  }
}