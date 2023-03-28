import {
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from 'react-native'
import { useUser } from '../../context'

export const ProfileScreen = () => {
	const { height } = useWindowDimensions()
	const { login = 'Natali Romanova' } = useUser()
	return (
		<View style={styles.container}>
			<ImageBackground
				style={styles.image}
				source={require('../../assets/images/bgd.jpg')}
			>
				<KeyboardAvoidingView
					style={{ ...styles.wrapper, height: height / 2 }}
					behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
				>
					<View style={styles.body}>
						<View style={styles.avatarWrapper}>
							<View style={styles.avatar}></View>
						</View>
					</View>

					<Text>{login}</Text>
				</KeyboardAvoidingView>
			</ImageBackground>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	body: {
		marginTop: -10,
		paddingHorizontal: 16,
		backgroundColor: '#fff',
		borderRadius: 20,
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
	avatarWrapper: {
		alignItems: 'center',
	},
	avatar: {
		marginTop: -60,
		marginHorizontal: 'auto',
		width: 120,
		height: 120,
		backgroundColor: 'rgba(0,0,0,0.6)',

		borderRadius: 16,
		marginBottom: 32,
	},
})
