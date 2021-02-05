import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from "./reducers/counter.reducer.js";
// import logger from "./middleware/logger.js";
// import test from "./middleware/test.js";

export const store = createStore(reducer, applyMiddleware(thunk));