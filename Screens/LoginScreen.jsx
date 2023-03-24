import { useState } from 'react'
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'

const LoginScreen = ({
	submit,
	changeForm,
	KeyboardApi: { isShowKeyboard, setIsShowKeyboard },
}) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [securePass, setSecurePass] = useState(true)

	const emailHandler = text => setEmail(text)
	const passwordHandler = text => setPassword(text)

	const handleSubmit = () => {
		submit({ email, password })
	}

	return (
		<View style={styles.form}>
			<Text style={styles.title}>Войти</Text>
			<View style={styles.fieldset}>
				<View style={styles.field}>
					<TextInput
						onFocus={() => setIsShowKeyboard(true)}
						value={email}
						onChangeText={emailHandler}
						placeholder='Адрес электронной почты'
						style={styles.input}
						onSubmitEditing={text => submit(text)}
					/>
				</View>
				<View style={styles.field}>
					<TextInput
						onFocus={() => setIsShowKeyboard(true)}
						value={password}
						onChangeText={passwordHandler}
						placeholder='Пароль'
						secureTextEntry={securePass}
						style={styles.input}
						onSubmitEditing={text => submit(text)}
					/>
					<TouchableOpacity
						style={styles.inputBtn}
						onPress={() => setSecurePass(prevState => !prevState)}
					>
						<Text style={{ ...styles.label, color: ' #1B4371' }}>
							{securePass ? 'Показать' : 'Скрыть'}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<TouchableOpacity style={styles.btn} onPress={handleSubmit}>
				<Text style={styles.label}>Войти</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.link} onPress={() => changeForm()}>
				<Text style={styles.label}>Нет аккаунта? Зарегистрироваться</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	form: {
		marginTop: -10,
		paddingHorizontal: 16,
		paddingTop: 32,
		backgroundColor: '#fff',
		borderRadius: 20,
	},
	avatar: {
		position: 'relative',
		marginTop: -60,
		width: 120,
		height: 120,
		backgroundColor: '#fff',
		borderRadius: 16,
		marginBottom: 32,
	},
	iconThumb: {
		position: 'absolute',
		bottom: 0,
		right: -10,
		width: 25,
		height: 25,
	},
	fieldset: {
		gap: 16,
		marginBottom: 43,
	},
	field: {
		position: 'relative',
	},
	inputBtn: {
		position: 'absolute',
		right: 0,
		top: 15,
	},
	input: {
		height: 50,
		padding: 10,
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		borderWidth: 1,
		color: '#212121',
		fontFamily: 'Roboto-Regular',
		borderColor: 'transparent',
	},
	label: { fontFamily: 'Roboto-Regular' },
	title: {
		textAlign: 'center',
		fontSize: 30,
		fontWeight: 500,
		color: '#212121',
		marginBottom: 32,
	},
	btn: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 51,
		marginBottom: 32,
		backgroundColor: '#FF6C00',
		borderRadius: 100,
		color: '#fff',
	},
	link: {
		alignItems: 'center',
		marginBottom: 133,
	},
})

export default LoginScreen
