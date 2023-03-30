import { useEffect, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Image,
	TouchableOpacity,
	useWindowDimensions,
} from 'react-native'

export const DefaultScreenPost = ({ navigation, route: { params } }) => {
	const [posts, setPosts] = useState([])
	const { width } = useWindowDimensions()
	useEffect(() => {
		if (params) {
			setPosts(prevState => [...prevState, params])
		}
	}, [params])

	const goToMap = location => {
		navigation.navigate('Map')
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={posts}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item: { location, title, photo } }) => (
					<View style={styles.post}>
						<View style={styles.photoContainer}>
							<Image
								source={{ uri: photo }}
								style={{
									...styles.photo,
									width: width - 34,
									height: width / 1.45,
								}}
							/>
						</View>
						<Text style={{ ...styles.text, marginBottom: 4, marginLeft: 6 }}>
							{title}
						</Text>
						<View style={styles.bottomBox}>
							<FontAwesome name='comment-o' size={24} color='black' />
							<TouchableOpacity onPress={() => navigation.navigate('Map')}>
								<Text style={styles.text}>location</Text>
							</TouchableOpacity>
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
		gap: 10,
		marginBottom: 20,
		marginHorizontal: 1,
	},
	photoContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 6,
		borderWidth: 1,
		borderColor: '#fff',
	},
	bottomBox: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 6,
	},
	text: {
		fontSize: 16,
		lineHeight: 19,
		fontWeight: 500,
		color: '#000',
	},
	photo: { borderRadius: 6 },
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
