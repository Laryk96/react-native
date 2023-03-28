import React from 'react'

import { NavigationContainer } from '@react-navigation/native'

import { useFonts } from 'expo-font'
import { useRoute } from './router'

export default function App() {
	const routing = useRoute(null)
	const [fontsLoaded] = useFonts({
		'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
		'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
	})

	if (!fontsLoaded) {
		return null
	}

	return <NavigationContainer>{routing}</NavigationContainer>
}
