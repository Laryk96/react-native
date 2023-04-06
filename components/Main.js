import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NavigationContainer } from '@react-navigation/native'

import { useRoute } from '../routes/routes'
import { refreshUser } from '../redux/auth/authOperatiom'
import { selectAuth } from '../redux/auth/selectors'

const Main = () => {
	const { isAuthorization } = useSelector(selectAuth)
	const state = useSelector(state => state)
	const dispatch = useDispatch()

	const routing = useRoute(isAuthorization)

	useEffect(() => {
		dispatch(refreshUser())
	}, [])
	console.log(state)
	return <NavigationContainer>{routing}</NavigationContainer>
}

export default Main
