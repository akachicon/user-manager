import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // todo: remove
import thunk from 'redux-thunk';
import throttle from 'lodash.throttle';
import rootReducer from './reducers';
import { loadState, saveState } from './local-storage';

const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(applyMiddleware(thunk)) // todo: revert
  );

  store.subscribe(throttle(() => {
    saveState(store.getState());
  }, 1000));

  return store;
};

export default configureStore;
