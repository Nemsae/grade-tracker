import AppDispatcher from '../AppDispatcher';

const GradeActions = {
  add(assignment) {
    AppDispatcher.dispatch({
      type: 'ADD_ASSIGNMENT',
      payload: {
        assignment,
      }
    })
  },

  remove(assignmentId) {
    AppDispatcher.dispatch({
      type: 'REMOVE_ASSIGNMENT',
      payload: {
        assignmentId,
      }
    })
  },

  total() {
    AppDispatcher.dispatch({
      type: 'TOTAL_SCORES',
    })
  },


}

export default GradeActions;
