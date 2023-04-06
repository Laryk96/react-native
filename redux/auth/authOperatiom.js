import { createAsyncThunk } from '@reduxjs/toolkit'
import '../../firebase'
import {
	getAuth,
	updateProfile,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
} from 'firebase/auth'
// import firebaseApp from '../../firebase'
export const registerUser = createAsyncThunk(
	'auth/register',
	async ({ email, password, login }, { rejectWithValue }) => {
		try {
			const auth = await getAuth()
			await createUserWithEmailAndPassword(auth, email, password)
			await updateProfile(auth.currentUser, {
				displayName: login,
			})

			const { uid, displayName } = await auth.currentUser

			return {
				userId: uid,
				nickname: displayName,
			}
		} catch (error) {
			console.log(error)
			return rejectWithValue(error.message)
		}
	}
)

export const loginUser = createAsyncThunk(
	'auth/login',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const auth = await getAuth()
			const { user } = await signInWithEmailAndPassword(auth, email, password)

			return { userId: user.uid, nickname: login }
		} catch (error) {
			console.log(error)
			return rejectWithValue(error.message)
		}
	}
)

export const refreshUser = createAsyncThunk(
	'auth/refresh',
	async (_, { rejectWithValue }) => {
		try {
			const auth = await getAuth()
			auth.onAuthStateChanged(user => {
				if (!user) {
					return rejectWithValue('User not found')
				}

				return { nickname: user.displayName, userId: user.uid }
			})
		} catch (error) {
			console.log(error)
			return rejectWithValue(error.message)
		}
	}
)

export const logOutUser = createAsyncThunk(
	'auth/refresh',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const auth = await getAuth()
			auth.onAuthStateChanged(user => setAuthorization(user))

			return { userId: user.uid, nickname: login }
		} catch (error) {
			console.log(error)
			return rejectWithValue(error.message)
		}
	}
)
