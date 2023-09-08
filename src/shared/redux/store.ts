import { combineReducers } from 'redux'
import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleWare from 'redux-saga';
import saga from './rootSaga';

import reducers from './slice';
const sagaMiddleWare = createSagaMiddleWare();
const rootReducer = combineReducers({
    reducers
});

const middleWares  = [sagaMiddleWare];
const store = configureStore({
    reducer : rootReducer,
    middleware:getDefaultMiddleware=>[
        ...getDefaultMiddleware({thunk:false,serializableCheck:false}),
        ...middleWares
    ]
})
sagaMiddleWare.run(saga);

export type RootState = ReturnType<typeof store.getState>
export default store;
