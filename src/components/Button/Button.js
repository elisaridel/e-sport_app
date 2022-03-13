import React from 'react';

export default class Button extends React.Component {
  render () {
    return (
      <button onClick={this.props.click} className="submit-button" type={this.props.type}>{this.props.buttonText}</button>
    )
  }
}