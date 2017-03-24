//constants

export const SET_POLYLINES = 'SET_POLYLINES';
export const CLEAR = 'CLEAR';
export const SET_COLOR = 'SET_COLOR';
//initial reducer state
const initialState = {
  polyLines: [],
  color: 'black',
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
      newState.color = 'black';
      break;
    case SET_COLOR:
      newState.color = action.color;
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

export const setColor = (color) => ({
  type: SET_COLOR,
  color
})

export const clearPolyLines = () => ({
  type: CLEAR,
})


export default drawkwardReducer;
