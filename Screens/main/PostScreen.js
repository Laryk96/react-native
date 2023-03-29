import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, Image } from 'react-native'

export const PostScreen = ({ route: { params } }) => {
	const [posts, setPosts] = useState([])

	useEffect(() => {
		if (params) {
			setPosts(prevState => [...prevState, params])
		}
	}, [params])

	return (
		<View style={styles.container}>
			<FlatList
				data={posts}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item: { location, title, photo } }) => (
					<View style={styles.post}>
						<View style={styles.photoContainer}>
							<Image source={{ uri: photo }} style={styles.photo} />
						</View>
						<View style={styles.textWrapper}>
							<Text style={styles.text}>{title}</Text>
							<Text style={styles.text}>{location}</Text>
						</View>
					</View>
				)}
			/>
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
		backgroundColor: '#fff',
	},
	post: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		marginBottom: 10,
	},
	photoContainer: {
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#fff',
		backgroundColor: 'yellow',
	},
	textWrapper: { gap: 6 },
	text: { color: '#000' },
	photo: { width: 60, height: 60, borderRadius: 10 },
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
