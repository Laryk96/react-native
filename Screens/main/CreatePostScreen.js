import { StyleSheet, Text, View } from 'react-native'

export const CreatePostScreen = () => {
	return (
		<View style={styles.container}>
			<Text>CreateScreen</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
