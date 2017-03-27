import { combineReducers } from 'redux';

import drawkward from './drawkward';
import pictionaryReducer from './pictionary';

const rootReducer = combineReducers({
  drawkward,
  pictionaryReducer
})

export default rootReducer;
