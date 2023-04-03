import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { useFonts } from 'expo-font'
import { LoginScreen, RegisterScreen } from './Screens/Auth'
import { HomeScreen } from './Screens/main/HomeScreen'
import { UserProvider } from './context'
import { Provider } from 'react-redux'
import { store } from './redux/store'

const AuthStack = createStackNavigator()

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
			<UserProvider>
				<NavigationContainer>
					<AuthStack.Navigator>
						<AuthStack.Screen
							options={{
								headerShown: false,
							}}
							name='Login'
							component={LoginScreen}
						/>
						<AuthStack.Screen
							options={{
								headerShown: false,
							}}
							name='Registration'
							component={RegisterScreen}
						/>
						<AuthStack.Screen
							options={{
								headerShown: false,
							}}
							name='HomeScreen'
							component={HomeScreen}
						/>
					</AuthStack.Navigator>
				</NavigationContainer>
			</UserProvider>
		</Provider>
	)
}
