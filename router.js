import React from 'react'
import { Ionicons, AntDesign } from '@expo/vector-icons'

import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { LoginScreen, RegisterScreen } from './Screens/Auth'
import { CreatePostScreen, PostScreen, ProfileScreen } from './Screens/main'

const MainStack = createBottomTabNavigator()
const AuthStack = createStackNavigator()

export const useRoute = isAuth => {
	if (!isAuth) {
		return (
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
				></AuthStack.Screen>
			</AuthStack.Navigator>
		)
	}

	return (
		<MainStack.Navigator>
			<MainStack.Screen
				options={{
					// headerShown: false,
					tabBarShowLabel: false,
					tabBarIcon: ({ focused, size, color }) => (
						<Ionicons
							name='person-outline'
							size={24}
							color='black'
							style={{
								backgroundColor: focused ? '#ff8c00' : 'transparent',
								paddingHorizontal: 20,
								paddingVertical: 6,
								borderRadius: 25,
							}}
						/>
					),
				}}
				name='Profile'
				component={ProfileScreen}
			/>
			<MainStack.Screen
				options={{
					// headerShown: false,
					tabBarShowLabel: false,
					tabBarIcon: ({ focused, size, color }) => (
						<AntDesign
							name='appstore-o'
							size={24}
							color='black'
							style={{
								backgroundColor: focused ? '#ff8c00' : 'transparent',
								paddingHorizontal: 20,
								paddingVertical: 6,
								borderRadius: 25,
							}}
						/>
					),
				}}
				name='Post'
				component={PostScreen}
			/>
			<MainStack.Screen
				options={{
					// headerShown: false,
					tabBarShowLabel: false,
					tabBarIcon: ({ focused, size, color }) => (
						<Ionicons
							name='ios-add'
							size={24}
							color='black'
							style={{
								backgroundColor: focused ? '#ff8c00' : 'transparent',
								paddingHorizontal: 20,
								paddingVertical: 6,
								borderRadius: 25,
							}}
						/>
					),
				}}
				name='Create'
				component={CreatePostScreen}
			/>
		</MainStack.Navigator>
	)
}
