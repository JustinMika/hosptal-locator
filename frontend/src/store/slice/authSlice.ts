import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
	id?: number | null | undefined;
	pseudo?: string;
	email?: string;
	PASSWORD?: string;
	latitude?: string;
	longitude?: string;
	userType?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

interface AuthState {
	user: User | null;
	token?: string | null;
}

const initialState: AuthState = {
	user: null,
	token: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (
			state,
			action: PayloadAction<{ user: User; token: string }>
		) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		logout: (state) => {
			state.user = null;
			state.token = null;
		},
	},
});

export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
