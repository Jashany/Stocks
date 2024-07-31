import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        user: (state, action) => {
            const { _id, phoneNumber, name, role, gender, isSalon } = action.payload;
            state.auth = { _id, phoneNumber, name, role, gender, isSalon };
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
    