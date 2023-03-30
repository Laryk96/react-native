import { useEffect, useState } from 'react'
import * as Location from 'expo-location'
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
import { MaterialIcons, Octicons } from '@expo/vector-icons'
import { Keyboard } from 'react-native'
import { useWindowDimensions } from 'react-native'

export const CreatePostScreen = ({ navigation: { navigate } }) => {
	const [permission, requestPermission] = Camera.useCameraPermissions()
	const [type, setType] = useState(CameraType.back)
	const [isShowKeyboard, setIsShowKeyboard] = useState(false)
	const { height } = useWindowDimensions()
	const [camera, setCamera] = useState(null)
	const [location, setLocation] = useState(null)
	const [title, setTitle] = useState('')
	const [photo, setPhoto] = useState(null)

	useEffect(() => {
		;async () => {
			await MediaLibrary.requestPermissionsAsync()
		}
		requestPermission()
	}, [])

	const takePhoto = async () => {
		const newPhoto = await camera.takePictureAsync()
		const location = await Location.getCurrentPositionAsync()
		setPhoto(newPhoto.uri)
		// setLocation(location)
		console.log(location)
	}

	const sendPost = () => {
		navigate('Post', { photo, title, location })
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
								<>
									<Camera
										style={{ ...styles.camera, height: height / 2.2 }}
										type={type}
										ref={setCamera}
									>
										{photo && (
											<View style={styles.photoContainer}>
												<Image source={{ uri: photo }} style={styles.photo} />
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
										<TouchableOpacity
											onPress={toggleCameraType}
											style={{ position: 'absolute', bottom: 10, right: 15 }}
										>
											<Octicons
												name='arrow-switch'
												size={24}
												color='black'
												style={{
													transform: [{ rotate: '90deg' }],
												}}
											/>
										</TouchableOpacity>
									</Camera>
									<Text style={styles.label}>Загрузите фото</Text>
								</>
							)}
							{!permission && (
								<View style={styles.camera}>
									<Text>promising reject</Text>
								</View>
							)}
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
							onPress={sendPost}
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 32,
		backgroundColor: '#fff',
	},
	form: { gap: 48 },
	camera: {
		borderRadius: 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	photoContainer: {
		position: 'absolute',
		bottom: 10,
		left: 10,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#fff',
	},
	photo: { width: 60, height: 60, borderRadius: 10 },
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
