import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import loginAdminSlice from './loginAdminSlice'
import isMenuSlice from './isMenuSlice'

const persistConfig = {
    key: 'milles_pharma_Slice_loginAdminSlice',
    storage
}

const reducers = combineReducers({
    loginAdminSlice: loginAdminSlice,
    isMenu: isMenuSlice
})
const persistedReducer = persistReducer(persistConfig, reducers)

const Store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        })
})

export default Store
