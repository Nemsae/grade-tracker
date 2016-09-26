import React, { Component } from 'react';
import uuid from 'uuid';

import GradeActions from '../actions/GradeActions'

export default class GradeForm extends Component {
  constructor(props) {
    super(props);

    this._submitForm = this._submitForm.bind(this);
  }

  _submitForm(e) {
    e.preventDefault();
    let { assignment, maximum, grade } = this.refs;

    let newAssignment = assignment.value;
    let newMaximum = parseInt(maximum.value);
    let newGrade = parseInt(grade.value);
    let newLetterGrade = '';

    if (newGrade >= 90) {
      newLetterGrade = 'A';
    } else if (newGrade < 90 && newGrade >= 80) {
      newLetterGrade = 'B';
    } else if (newGrade < 80 && newGrade >= 70) {
      newLetterGrade = 'C';
    } else if (newGrade < 70 && newGrade >= 60) {
      newLetterGrade = 'D';
    } else {
      newLetterGrade = 'F';
    }

    let newPackage = {
      name: newAssignment,
      max: newMaximum,
      grade: newGrade,
      id: uuid(),
      letter: newLetterGrade,
    }

    console.log('newPackage: ',newPackage);

    GradeActions.add(newPackage);
    GradeActions.total();

    document.getElementById('submitForm').reset();
  }

  render() {
    return (
      <form id='submitForm' onSubmit={this._submitForm}>
        <div className="form-group">
          <label htmlFor="newEvent">Assignment:</label>
          <input ref='assignment' type="text" className="form-control" id="newAssignment" required/>
        </div>
        <div className="form-group">
          <label htmlFor="newStartDate">Total Possible Points: </label>
          <input ref='maximum' type="number" className="form-control" id="newMax" max='100'/>
        </div>
        <div className="form-group">
          <label htmlFor="newEndDate">Points Awarded: </label>
          <input ref='grade' type="number" className="form-control" id="newGrade" max='100'/>
        </div>
        <button onClick={this._submitForm} className="btn btn-default">Add</button>
      </form>
    )
  }
}
