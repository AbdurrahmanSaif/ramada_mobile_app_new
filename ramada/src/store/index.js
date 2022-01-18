import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';

import reducer from '../reducers';

import { persistStore, persistReducer } from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: ['abc'], // TODO: to remove this later.
};

// const middlewares =
//   process.env.NODE_ENV === 'development' ? [thunk, logger] : [thunk];

const middlewares =
  process.env.NODE_ENV === 'development' ? [thunk] : [thunk];

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : args => args,
  ),
);

export const persistor = persistStore(store);
