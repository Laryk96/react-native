import { createAsyncThunk } from '@reduxjs/toolkit'
import '../../firebase'
import {
	getAuth,
	updateProfile,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from 'firebase/auth'
import { setLoginStatus } from './authSlice'
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

			return { userId: user.uid, nickname: user.displayName }
		} catch (error) {
			console.log(error)
			return rejectWithValue(error.message)
		}
	}
)

export const logOutUser = createAsyncThunk(
	'auth/logout',
	async (_, { rejectWithValue }) => {
		try {
			const auth = await getAuth()
			await signOut(auth)

			return
		} catch (error) {
			console.log(error)
			return rejectWithValue(error.message)
		}
	}
)

export const refreshUser = createAsyncThunk(
	'auth/refresh',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			const auth = await getAuth()
			await onAuthStateChanged(auth, user => {
				console.log('user', user)

				if (user) {
					return dispatch(
						setLoginStatus({
							nickname: user.displayName,
							userId: user.uid,
							isAuthorization: true,
						})
					)
				}
			})
		} catch (error) {
			console.log(error)
			return rejectWithValue(error.message)
		}
	}
)

// if (!user) return rejectWithValue('user not found')
