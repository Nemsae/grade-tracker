import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';
import GradeActions from '../actions/GradeActions';
import Storage from '../Storage';

let _assignments = Storage.read('assignments') || [];
let _totalScore = Storage.read('totalScore') || 0;
let _totalMax = Storage.read('totalMax') || 0;
let _totalGrade = Storage.read('totalGrade') || 0;

class GradeStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch (action.type) {
        case 'ADD_ASSIGNMENT':
          let { assignment } = action.payload;
          _assignments.push(assignment);
          this.emit('CHANGE');
          break;
        case 'REMOVE_ASSIGNMENT':
          let { assignmentId } = action.payload;
          let updatedAssignments = _assignments.filter(hw => {
            if(hw.id === assignmentId) {
              return;
            } else {
              return hw;
            }
          })
          _assignments = updatedAssignments;
          this.emit('CHANGE');
          break;
        case 'TOTAL_SCORES':
          _totalScore = 0;
          _totalMax = 0;
          for (var i=0;i<_assignments.length;i++) {
            let assignment = _assignments[i];
            _totalScore += assignment.grade;
            _totalMax += assignment.max;
          }

          let avgScore = (_totalScore/_totalMax)*100;

          if (avgScore >= 90) {
            _totalGrade = 'A';
          } else if (avgScore < 90 && avgScore >= 80) {
            _totalGrade = 'B';
          } else if (avgScore < 80 && avgScore >= 70) {
            _totalGrade = 'C';
          } else if (avgScore < 70 && avgScore >= 60) {
            _totalGrade = 'D';
          } else {
            _totalGrade = 'F';
          }
          this.emit('CHANGE');
          break;
      }
    });

    this.on('CHANGE', () => {
      Storage.write('assignments', _assignments);
      Storage.write('totalScore', _totalScore);
      Storage.write('totalMax', _totalMax);
      Storage.write('totalGrade', _totalGrade);
    })
  }

  startListening(callback) {
    this.on('CHANGE', callback);
  }

  stopListening(callback) {
    this.removeListener('CHANGE', callback);
  }

  getAssignments() {
    return _assignments;
  }

  getTotalScore() {
    return _totalScore;
  }

  getTotalGrade() {
    return _totalGrade;
  }

  getTotalMax() {
    return _totalMax;
  }

}

export default new GradeStore();
