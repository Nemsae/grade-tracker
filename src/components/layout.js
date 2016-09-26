import React, { Component } from 'react';

import GradeForm from './GradeForm';
import GradeTable from './GradeTable';
import GradeTotals from './GradeTotals';

export default class Layout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container text-center">
        <h1 className="text-center">Grade Tracker</h1>
        <div className="col-xs-6">
          <GradeForm />
        </div>
        <div className="col-xs-6">
          <GradeTable />
        </div>
        <div className="col-xs-12">
          <GradeTotals />
        </div>
      </div>
    )
  }
}
