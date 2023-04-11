import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NavigationContainer } from '@react-navigation/native'

import { useRoute } from '../routes/routes'
// import { refreshUser } from '../redux/auth/authOperatiom'
import { selectAuth } from '../redux/auth/selectors'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import app from '../firebase'

import { updateUserProfile } from '../redux/auth/authSlice'

const auth = getAuth()

const Main = () => {
	const [authState, setAuthState] = useState(null)
	const { isAuthorization } = useSelector(selectAuth)
	const state = useSelector(state => state)
	const dispatch = useDispatch()

	const routing = useRoute(authState)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			console.log('user', user)
			if (user) {
				setAuthState(true)
				dispatch(
					updateUserProfile({ userId: user.userId, nickname: user.displayName })
				)
			} else {
				return setAuthState(false)
			}
		})
		return () => {
			unsubscribe()
		}
	})
	console.log(state.auth)
	// useEffect(() => {
	// 	// dispatch(refreshUser())
	// }, [])
	// console.log(state)
	return <NavigationContainer>{routing}</NavigationContainer>
}

export default Main
