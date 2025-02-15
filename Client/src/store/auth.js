import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:  null,
    flag:  false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            const { user } = action.payload;
            state.user = user;
            state.flag = true;
        },
        logout: (state, action) => {
            state.user = null;
            state.flag = false;
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
