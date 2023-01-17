import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// import { createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { chatReducer } from './chat.js';
import sessionReducer from './session';
// import spotsReducer from "./spots";
// import reviewsReducer from "./reviews";

// frontend/src/store/index.js
// ...

const rootReducer = combineReducers({
  session: sessionReducer,
  messages: chatReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
    // return createStore(rootReducer, preloadedState);
};

export default configureStore;