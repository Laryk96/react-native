import React from 'react'

import { useFonts } from 'expo-font'

import { Provider } from 'react-redux'
import { store } from './redux/store'

import Main from './components/Main'

export default function App() {
	const [fontsLoaded] = useFonts({
		'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
		'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
	})

	if (!fontsLoaded) {
		return null
	}

	return (
		<Provider store={store}>
			<Main />
		</Provider>
	)
}
