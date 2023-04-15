import {
	collection,
	getDocs,
	getFirestore,
	onSnapshot,
	query,
	where,
} from 'firebase/firestore'

import {
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from 'react-native'

import { useEffect, useState } from 'react'

import app from '../../firebase'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../redux/auth/selectors'

export const ProfileScreen = () => {
	const { height } = useWindowDimensions()
	const { userId } = useSelector(selectAuth)
	const [] = useState()
	useEffect(() => {
		getUserPost()
	}, [])

	const getUserPost = async () => {
		try {
			const db = await getFirestore(app)
			const citiesRef = await collection(db, 'post')
			console.log(userId)
			const q = await query(citiesRef, where('userId', '==', userId))

			await onSnapshot(q, snapshot => {
				console.log(snapshot)
				console.log(snapshot.docs.map(doc => ({ ...doc.data() })))
			})
		} catch (error) {
			console.log(error)
		}
	}
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

					<Text></Text>
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
