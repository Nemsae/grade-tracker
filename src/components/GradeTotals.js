import React, { Component } from 'react';

import GradeStore from '../stores/GradeStore'

export default class GradeTotals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalScore: GradeStore.getTotalScore(),
      totalMax: GradeStore.getTotalMax(),
      totalGrade: GradeStore.getTotalGrade(),
    }

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    GradeStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    GradeStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      totalScore: GradeStore.getTotalScore(),
      totalMax: GradeStore.getTotalMax(),
      totalGrade: GradeStore.getTotalGrade(),
    })
  }

  render() {
    const { totalScore, totalMax, totalGrade } = this.state;
    return (
      <div>
        <h3>Total Grade</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Total Score:</th>
              <th>Total Maximum Points:</th>
              <th>Total Grade Awarded:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{totalScore}</td>
              <td>{totalMax}</td>
              <td>{totalGrade}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )

  }
}
