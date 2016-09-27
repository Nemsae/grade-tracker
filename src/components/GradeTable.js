import React, { Component } from 'react';

import GradeStore from '../stores/GradeStore'
import GradeActions from '../actions/GradeActions'

export default class GradeTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignments: GradeStore.getAssignments(),
    }

    this._onChange = this._onChange.bind(this);
    this._removeAssignment = this._removeAssignment.bind(this);
  }

  componentWillMount() {
    GradeStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    GradeStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      assignments: GradeStore.getAssignments(),
    })
  }

  _removeAssignment(id) {
    GradeActions.remove(id);
    GradeActions.total();

  }

  render() {
    let { assignments } = this.state;
    return  (
      <table className="table">
        <thead>
          <tr>
            <th>Assignment Name:</th>
            <th>Total Points:</th>
            <th>Points Awarded:</th>
            <th>Grade Awarded:</th>
            <th>Delete Assignment</th>
          </tr>
        </thead>
        <tbody>

          {assignments.map(assignment => (
            <tr key={assignment.id}>
              <td>{assignment.name}</td>
              <td>{assignment.max}</td>
              <td>{assignment.grade}</td>
              <td>{assignment.letter}</td>
              <td>
                <button onClick={()=> this._removeAssignment(assignment.id)} className="btn btn-sm btn-danger">X</button>
                {/* <button onClick={this._removeAssignment(assignment.id)} className="btn btn-sm btn-danger">X</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}
