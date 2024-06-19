import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: [],
    erreur: '',
    uuid: '',
    token: '',
    isConnected: false
}

const loginAdminSlice = createSlice({
    name: 'loginAdminSlice',
    initialState,
    reducers: {
        setuserData: (state, payload) => {
            state.user = payload.payload
        },
        setUuid: (state, payload) => {
            state.uuid = payload.payload
        },
        setToken: (state, payload) => {
            state.token = payload.payload
        },
        removeData: state => {
            state.user = []
            state.token = ''
            state.uuid = ''
            state.isConnected = false
        },
        setErreur: (state, payload) => {
            state.erreur = payload.payload
        },
        setIsConnected: (state, payload) => {
            state.isConnected = payload.payload
        }
    }
})

export const {
    setuserData,
    setUuid,
    setToken,
    removeData,
    setErreur,
    setIsConnected
} = loginAdminSlice.actions
export default loginAdminSlice.reducer
