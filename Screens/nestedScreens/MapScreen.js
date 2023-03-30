import { StyleSheet, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

export const MapScreen = ({ route: { params } }) => {
	const { latitude, longitude } = params
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
				<Marker coordinate={{ latitude, longitude }} />
			</MapView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})
