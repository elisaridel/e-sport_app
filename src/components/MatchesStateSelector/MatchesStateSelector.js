import React from 'react';
import Tag from '../Tag/Tag';

export default class MatchesStateSelector extends React.Component {

  render () {
    return (
      <div className='tags'>
        <Tag tagContent="A venir" tagValue={this.props.matchStates.toCome} currentMatchState={this.props.currentMatchState} onClick={(e) => this.props.setState(this.props.matchStates.toCome, e)} />
        <Tag tagContent="En cours" tagValue={this.props.matchStates.ongoing} currentMatchState={this.props.currentMatchState} onClick={(e) => this.props.setState(this.props.matchStates.ongoing, e)}></Tag>
        <Tag tagContent="Terminé" tagValue={this.props.matchStates.finished} currentMatchState={this.props.currentMatchState} onClick={(e) => this.props.setState(this.props.matchStates.finished, e)}></Tag>
      </div>
    )
  }
}