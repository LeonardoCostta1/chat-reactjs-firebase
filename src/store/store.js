import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 
import onlyUserReducer from "./reducers/onlyUser";
import sendMessagesReducer from "./reducers/sendMessages";
import userReducer from "./reducers/user";
import mySaga from "./sagas/saga";

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const rootReducer = combineReducers({ 
  user: userReducer,
  only: onlyUserReducer,
  sendMessages:sendMessagesReducer
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware
});

sagaMiddleware.run(mySaga);

export default store;
