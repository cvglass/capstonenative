//constants

export const SET_POLYLINES = 'SET_POLYLINES';


//initial reducer state
const initialState = {
  polyLines: [],
}

//reducer
const drawkwardReducer = (prevState = initialState, action) => {

  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case SET_POLYLINES:
      newState.polyLines = prevState.polyLines.concat([action.polyLines]);
      break;
    default:
      return prevState;
  }
  return newState;
}


//action creators

export const setPolyLines = (polyLines) => ({
  type: SET_POLYLINES,
  polyLines
});



export default drawkwardReducer;
