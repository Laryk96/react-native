import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NavigationContainer } from '@react-navigation/native'

import { useRoute } from '../routes/routes'
import { selectAuth } from '../redux/auth/selectors'
import { refreshUser } from '../redux/auth/authOperatiom'

const Main = () => {
	const { isAuthorization } = useSelector(selectAuth)
	const dispatch = useDispatch()
	const routing = useRoute(isAuthorization)
	// const [authState, setAuthState] = useState(null)
	// const state = useSelector(state => state)
	// const { user } = useAuthentication()
	// console.log('user', user)
	// useEffect(() => {
	// 	const auth = getAuth()

	// 	const unsubscribe = onAuthStateChanged(auth, user => {
	// 		if (user) {
	// 			setAuthState(true)
	// 			dispatch(
	// 				updateUserProfile({ userId: user.userId, nickname: user.displayName })
	// 			)
	// 		} else {
	// 			return setAuthState(false)
	// 		}
	// 	})
	// return () => {
	// 	unsubscribe()
	// }
	// })

	useEffect(() => {
		dispatch(refreshUser())
	}, [])

	return <NavigationContainer>{routing}</NavigationContainer>
}

export default Main
