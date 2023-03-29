import { useEffect, useState } from 'react'
import { Camera, CameraType } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'

import { EvilIcons } from '@expo/vector-icons'

import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	Image,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Keyboard } from 'react-native'

export const CreatePostScreen = () => {
	const [type, setType] = useState(CameraType.back)
	const [permission, requestPermission] = Camera.useCameraPermissions()
	const [camera, setCamera] = useState(null)
	const [photo, setPhoto] = useState(null)
	const [title, setTitle] = useState('')
	const [location, setLocation] = useState('')
	const [isShowKeyboard, setIsShowKeyboard] = useState(false)

	useEffect(() => {
		requestPermission()
	}, [])

	const takePhoto = async () => {
		const photo = await camera.takePictureAsync()
		setPhoto(photo.uri)
	}
	const keyboardHide = () => {
		setIsShowKeyboard(false)
		Keyboard.dismiss()
	}

	const handleTitle = text => setTitle(text)
	const handleLocation = text => setLocation(text)

	function toggleCameraType() {
		setType(current =>
			current === CameraType.back ? CameraType.front : CameraType.back
		)
	}

	if (permission) {
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
							<View>
								{permission && (
									<Camera style={styles.camera} type={type} ref={setCamera}>
										{photo && (
											<View style={styles.photoContainer}>
												<Image
													source={{ url: photo }}
													style={{ width: 100, height: 100 }}
												/>
											</View>
										)}
										<TouchableOpacity
											style={styles.toggleButton}
											onPress={takePhoto}
										>
											<MaterialIcons
												name='enhance-photo-translate'
												size={24}
												color='#BDBDBD'
											/>
										</TouchableOpacity>
									</Camera>
								)}
								{!permission && (
									<View style={styles.camera}>
										<Text>promising reject</Text>
									</View>
								)}
								{!permission.granted && (
									<View style={styles.camera}>
										<Text>ops... promising not granted</Text>
									</View>
								)}
								<Text style={styles.label}>Загрузите фото</Text>
							</View>
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
									// backgroundColor: validation ? '#FF6C00' : '#F6F6F6',
								}}
							>
								<Text
									style={{
										...styles.text,
										// color: validation ? '#fff' : '#BDBDBD',
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
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 32,
		backgroundColor: '#fff',
	},
	form: { gap: 48 },
	camera: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 240,
	},
	photoContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		borderWidth: 1,
		borderColor: '#fff',
	},
	toggleButton: {
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
