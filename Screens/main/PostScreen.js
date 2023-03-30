import { createStackNavigator } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { CommentsScreen } from '../nestedScreens/CommentsScreen'
import { DefaultScreenPost } from '../nestedScreens/DefaultScreenPosts'
import { MapScreen } from '../nestedScreens/MapScreen'
import { Ionicons, AntDesign } from '@expo/vector-icons'
const NestedScreen = createStackNavigator()

export const PostScreen = ({ route: { params } }) => {
	return (
		<NestedScreen.Navigator>
			<NestedScreen.Screen
				name='DefaultScreen'
				component={DefaultScreenPost}
				options={{
					headerTitleAlign: 'center',
					headerRight: () => (
						<TouchableOpacity
							style={{ marginRight: 16 }}
							onPress={() => navigation.navigate('Login')}
						>
							<Ionicons name='exit-outline' size={24} color='black' />
						</TouchableOpacity>
					),
				}}
			/>
			<NestedScreen.Screen name='Comments' component={CommentsScreen} />
			<NestedScreen.Screen name='Map' component={MapScreen} />
		</NestedScreen.Navigator>
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
})
