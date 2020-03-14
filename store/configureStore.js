import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import reducer from '../reducers/reducer';
import thunkMiddleware from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import {Platform} from 'react-native';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const rootReducer = combineReducers({reducer});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default () => {
  /**
   * Only enable redux logger while in development mode
   */
  const middleware = [thunkMiddleware];

  const middlewareEnhancer = applyMiddleware(...middleware);

  const enhancer = compose(
    middlewareEnhancer,
    devTools({
      name: Platform.OS,
      realtime: true,
    }),
  );

  let store = createStore(persistedReducer, undefined, enhancer);
  let persistor = persistStore(store, null, () => {
    // if you want to get restoredState
  });
  return {store: store, persistor: persistor};
};