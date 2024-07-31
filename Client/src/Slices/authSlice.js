import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        user: (state, action) => {
            const { _id, email, money, username, stocks } = action.payload;
            state.auth = { _id, username, email, money, stocks };
            localStorage.setItem("auth", JSON.stringify(state.auth));
        },
        clearUser: (state) => {
            state.auth = null;
            localStorage.removeItem("auth");
        },
    },
});

export const { user, clearUser } = authSlice.actions;

export default authSlice.reducer;
