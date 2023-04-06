import React, { useEffect, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native'

import { useFonts } from 'expo-font'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import firebaseApp from './firebase'

import { Provider } from 'react-redux'
import { store } from './redux/store'
import { useRoute } from './routes/routes'

export default function App() {
	const [user, setUser] = useState(null)

	const routing = useRoute(user)
	const [fontsLoaded] = useFonts({
		'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
		'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
	})

	useEffect(() => {
		const auth = getAuth(firebaseApp)
		auth.onAuthStateChanged(user => setUser(user.email))
	}, [])

	if (!fontsLoaded) {
		return null
	}
	console.log('user', user)
	return (
		<Provider store={store}>
			<NavigationContainer>{routing}</NavigationContainer>
		</Provider>
	)
}
// ;<AuthStack.Navigator>
// 	<AuthStack.Screen
// 		options={{
// 			headerShown: false,
// 		}}
// 		name='Login'
// 		component={LoginScreen}
// 	/>
// 	<AuthStack.Screen
// 		options={{
// 			headerShown: false,
// 		}}
// 		name='Registration'
// 		component={RegisterScreen}
// 	/>
// 	<AuthStack.Screen
// 		options={{
// 			headerShown: false,
// 		}}
// 		name='HomeScreen'
// 		component={HomeScreen}
// 	/>
// </AuthStack.Navigator>
