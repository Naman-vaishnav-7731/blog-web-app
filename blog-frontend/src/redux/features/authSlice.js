import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userInfo: "",
    accessToken: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.userInfo = action.payload.currentUser
            state.accessToken = action.payload.accessToken
        },
        logOut: (state) => {
            state.userInfo = null
            state.accessToken = null
        }
    }
})

export const { setUser, logOut } = authSlice.actions
export const { reducer: authReducer } = authSlice;

export const selectCurrentUser = (state) => state.auth.userInfo;
