import React, { useEffect, useState } from 'react'

import { useFonts } from 'expo-font'
import {
	StyleSheet,
	View,
	TouchableWithoutFeedback,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	ImageBackground,
	Dimensions,
} from 'react-native'
import LoginScreen from './Screens/LoginScreen'
import RegistrationScreen from './Screens/RegistrationScreen'

export default function App() {
	const [showRegistration, setShowRegistration] = useState(true)
	const [isShowKeyboard, setIsShowKeyboard] = useState(false)
	const [dimensions, setDimensions] = useState(
		() => Dimensions.get('window').width
	)

	const [fontsLoaded] = useFonts({
		'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
		'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
	})

	useEffect(() => {
		const onChange = () => {
			const width = Dimensions.get('window').width

			setDimensions(width)
		}

		Dimensions.addEventListener('change', onChange)
		return () => Dimensions.removeEventListener('change', onChange)
	}, [])

	const changeForm = () => setShowRegistration(prevState => !prevState)

	const keyboardHide = () => {
		setIsShowKeyboard(false)
		Keyboard.dismiss()
	}

	const onSubmit = values => {
		console.log(values)
		Keyboard.dismiss()

		setIsShowKeyboard(false)
	}

	if (!fontsLoaded) {
		return null
	}

	return (
		<TouchableWithoutFeedback onPress={keyboardHide}>
			<View style={styles.container}>
				<ImageBackground
					style={styles.image}
					source={require('./assets/images/bgd.jpg')}
				>
					<KeyboardAvoidingView
						style={{
							...styles.wrapper,
							width: dimensions,
							marginBottom: isShowKeyboard ? 60 : 0,
						}}
						behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
					>
						{showRegistration ? (
							<RegistrationScreen
								KeyboardApi={{ isShowKeyboard, setIsShowKeyboard }}
								changeForm={changeForm}
								submit={onSubmit}
							/>
						) : (
							<LoginScreen
								KeyboardApi={{ isShowKeyboard, setIsShowKeyboard }}
								changeForm={changeForm}
								submit={onSubmit}
							/>
						)}
					</KeyboardAvoidingView>
				</ImageBackground>
			</View>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'flex-end',
	},
	wrapper: {
		backgroundColor: '#fff',
		paddingBottom: 1,
	},
})
