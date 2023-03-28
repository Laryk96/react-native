import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { useUser } from '../../context'

export const PostScreen = () => {
	const { email = '', login = '' } = useUser()
	return (
		<View style={styles.container}>
			{/* <TouchableOpacity style={styles.exitBtn}>
				<Ionicons name='exit-outline' size={24} color='black' />
			</TouchableOpacity> */}
			<View style={styles.avatarWrapper}>
				<View style={styles.avatar}></View>
				<View>
					<Text style={styles.name}>{login || 'Natali Romanova'}</Text>
					<Text style={styles.email}>{email}</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 32,
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	avatar: {
		height: 60,
		width: 60,
		backgroundColor: '#a9a9a9',
		borderRadius: 16,
	},

	avatarWrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
	},
	name: {
		fontWeight: 700,
		fontSize: 13,
		lineHeight: 15,
		color: '#212121',
	},
	email: {
		fontSize: 11,
		lineHeight: 13,
		color: 'rgba(33, 33, 33, 0.8)',
	},

	exitBtn: {
		position: 'absolute',
		top: -10,
		right: 19,
	},
})
