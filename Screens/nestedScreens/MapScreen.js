import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

export const MapScreen = ({ route: { latitude, longitude } }) => {
	return (
		<View style={styles.container}>
			<MapView
				style={{ flex: 1 }}
				initialRegion={{
					latitude,
					longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
			>
				<Marker coordinate={{ latitude, longitude }} title='travel photo' />
			</MapView>
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
