import { configureStore } from '@reduxjs/toolkit';
import errReducer from './reducer/errReducer';
import dataReducer from './reducer/dataReducer';
import * as reduxThunk from 'redux-thunk/extend-redux';

export const store = configureStore({
    reducer: {
        data: dataReducer,
        err: errReducer,
    },
});
