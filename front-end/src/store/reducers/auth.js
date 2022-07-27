import { createSlice } from '@reduxjs/toolkit';

//import { HandleVerify } from '../../services/authServices';

//const initialState = await HandleVerify();

const initialState = {
    name: '',
    email: '',
    created_at: '',
    permissions: []
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login (state, action) {
            state.name = action.payload.resAPI.user.name;
            state.email = action.payload.resAPI.user.email;
            state.created_at = action.payload.resAPI.user.created_at;
            state.permissions = action.payload.resAPI.permissions;
        },
        logout (state, action) {
            state.name = '';
            state.email = '';
            state.created_at = '';
            state.permissions = [];
        }
    }
});

export default auth.reducer;

export const { login, logout } = auth.actions;