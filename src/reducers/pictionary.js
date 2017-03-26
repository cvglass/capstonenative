
//constants
export const CREATE_TEAM = 'create team';

//initial reducer state
const initialState = {
  team: {}
}

//reducer
const pictionaryReducer = (prevState = initialState, action) => {

  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case CREATE_TEAM:
      newState.team = Object.assign({}, action.team);
      break;
    default:
      return prevState;
  }
  return newState;
}


//action creators
export const createTeam = teamData => ({
  type: CREATE_TEAM,
  team: teamData
});

export default pictionaryReducer;
