import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { EvilIcons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

export const CreatePostScreen = () => {
	const [isShowKeyboard, setIsShowKeyboard] = useState(false)
	const [validation, setValidation] = useState(false)
	const [image, setImage] = useState(true)
	const [title, setTitle] = useState('')
	const [location, setLocation] = useState('')
	const keyboardHide = () => {
		setIsShowKeyboard(false)
		Keyboard.dismiss()
	}

	useEffect(() => {
		if (location && image && title) {
			return setValidation(true)
		}
		setValidation(false)
	})

	const handleTitle = text => setTitle(text)
	const handleLocation = text => setLocation(text)

	return (
		<TouchableWithoutFeedback nPress={keyboardHide}>
			<View style={styles.container}>
				<KeyboardAvoidingView
					style={{
						marginBottom: isShowKeyboard ? 60 : 0,
					}}
					behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
				>
					<View style={styles.form}>
						<TouchableOpacity>
							<View style={styles.image}>
								<View style={styles.imageWrapper}>
									<MaterialIcons
										name='enhance-photo-translate'
										size={24}
										color='#BDBDBD'
									/>
								</View>
							</View>
							<Text style={styles.label}>Загрузите фото</Text>
						</TouchableOpacity>
						<View style={styles.field}>
							<TextInput
								value={title}
								style={styles.input}
								placeholder='Название...'
								onChangeText={handleTitle}
							/>
						</View>

						<View style={styles.field}>
							<EvilIcons name='location' size={24} color='black' />
							<TextInput
								value={location}
								style={styles.input}
								placeholder='Местность...'
								onChangeText={handleLocation}
							/>
						</View>
						<TouchableOpacity
							style={{
								...styles.btnSubmit,
								backgroundColor: validation ? '#FF6C00' : 'transparent',
							}}
						>
							<Text
								style={{
									...styles.text,
									color: validation ? '#fff' : '#BDBDBD',
								}}
							>
								Опубликовать
							</Text>
						</TouchableOpacity>
						<View style={styles.form}></View>
					</View>
				</KeyboardAvoidingView>
			</View>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 32,
		backgroundColor: '#fff',
	},
	form: { gap: 48 },
	image: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 240,
	},
	imageWrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		width: 60,
		backgroundColor: ' rgba(255, 255, 255, 0.3)',
		borderRadius: 100,
	},
	text: { textAlign: 'center' },
	label: {
		fontSize: 16,
		lineHeight: 19,
		color: '#BDBDBD',
	},
	field: {
		flexDirection: 'row',
		height: 20,
		gap: 4,
	},
	input: { flex: 1 },
	btnSubmit: {
		marginHorizontal: 2,
		borderRadius: 100,
		paddingVertical: 16,
	},
})
