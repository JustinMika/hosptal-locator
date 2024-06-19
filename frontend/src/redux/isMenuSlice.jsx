import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false
}

const isMenuSlice = createSlice({
    name: 'isMenu',
    initialState,
    reducers: {
        setIsMenu: (state, payload) => {
            state.isOpen = payload.payload
        }
    }
})

export const { setIsMenu } = isMenuSlice.actions
export default isMenuSlice.reducer
