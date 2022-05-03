import {combineReducers, configureStore} from "@reduxjs/toolkit";
import InfoReducer from './info/info.slice'
import FileReducer from './files/files.slice'
export const store = configureStore({
    reducer: combineReducers({
        info: InfoReducer,
        files: FileReducer,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch