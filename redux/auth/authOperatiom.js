import { createAsyncThunk } from '@reduxjs/toolkit'
import '../../firebase'
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth'
import { updateUserProfile } from './authSlice'

export const register = createAsyncThunk(
	'auth/register',
	async ({ email, password, login }, { rejectWithValue }) => {
		try {
			const auth = await getAuth()
			const { user } = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)

			return { userId: user.uid, nickname: login }
		} catch (error) {
			console.log(error.message)
			return rejectWithValue(error.message)
		}
	}
)

export const login = createAsyncThunk(
	'auth/login',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const auth = await getAuth()
			const { user } = await signInWithEmailAndPassword(auth, email, password)

			return { userId: user.uid, nickname: login }
		} catch (error) {
			console.log(error)
			console.log(error.code)
			console.log(error.message)
			return rejectWithValue(error.message)
		}
	}
)
// export const login = createAsyncThunk(
// 	'auth/login',
// 	async ({ email, password }, { rejectWithValue }) => {
// 		try {
// 			const auth = await getAuth()
// 			const user = await signInWithEmailAndPassword(auth, email, password)
// 			console.log('user', user)
// 			return user.user
// 		} catch (error) {
// 			console.log(error)
// 			console.log(error.code)
// 			console.log(error.message)
// 			return rejectWithValue(error.message)
// 		}
// 	}
// )
