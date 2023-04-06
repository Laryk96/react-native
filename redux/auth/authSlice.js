import { createSlice } from '@reduxjs/toolkit'
import {
	logOutUser,
	loginUser,
	refreshUser,
	registerUser,
} from './authOperatiom'

const handleRejected = (state, { payload }) => {
	state.isAuthorization = false
	state.error = payload
}

const handlePending = state => {
	state.isAuthorization = false
}

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		userId: null,
		nickname: null,
		isAuthorization: false,
		isError: false,
	},
	extraReducers: builder => {
		builder
			.addCase(registerUser.fulfilled, (state, { payload }) => {
				state.userId = payload.userId
				state.nickname = payload.nickname
				state.isAuthorization = true
			})
			.addCase(refreshUser.fulfilled, (state, { payload }) => {
				state.userId = payload.userId
				state.nickname = payload.nickname
				state.isAuthorization = true
			})
			.addCase(registerUser.pending, handlePending)
			.addCase(loginUser.pending, handlePending)
			.addCase(logOutUser.pending, handlePending)
			// .addCase(refreshUser.pending, handlePending)
			.addCase(registerUser.rejected, handleRejected)
			.addCase(loginUser.rejected, handleRejected)
			.addCase(logOutUser.rejected, handleRejected)
		// .addCase(refreshUser.rejected, handleRejected)
	},
})

export const { updateUserProfile } = authSlice

//
