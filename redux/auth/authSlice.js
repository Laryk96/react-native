import { createSlice } from '@reduxjs/toolkit'
import { register } from './authOperatiom'

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		userId: null,
		nickname: null,
	},
	extraReducers: builder => {
		builder.addCase(register.fulfilled, (state, { payload }) => {
			state.userId = payload.userId
			state.nickname = payload.nickname
		})
	},
})

export const { updateUserProfile } = authSlice
//   .addCase(register.pending, handlePending)
//   .addCase(login.pending, handlePending)
//   .addCase(logOut.pending, handlePending)
//   .addCase(refreshUser.pending, handlePending)
//   .addCase(register.rejected, handleRejected)
//   .addCase(login.rejected, handleRejected)
//   .addCase(logOut.rejected, handleRejected)
//   .addCase(refreshUser.rejected, handleRejected)
