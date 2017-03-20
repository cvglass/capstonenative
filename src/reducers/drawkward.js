//constants

export const SET_POLYLINES = 'SET_POLYLINES';
export const CLEAR = 'CLEAR';

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
    case CLEAR:
      newState.polyLines = [];
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

export const clearPolyLines = () => ({
  type: CLEAR,
})


export default drawkwardReducer;
