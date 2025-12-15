import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card, Input, ScheduleGrid } from './src/components'; // ← Add Card and Input
import { createStaticNavigation } from '@react-navigation/native';
import HomeScreen from './src/screens/Home/HomeScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import ScheduleScreen from './src/screens/Schedule/ScheduleScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const stack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    Schedule: ScheduleScreen,
    Profile: ProfileScreen,
  },
});
const Navigation = createStaticNavigation(stack);

export default function App() {
	return (
    <Navigation>
		<View className='flex-1 items-center justify-center bg-gray-50 p-4'>
			<Text>Open up App.js to start working on your app!</Text>
			<StatusBar style='auto' />
			<Card title='Test Components'>
				<Input label='Email' placeholder='test@example.com' />
				<Button title='Click Me' onPress={() => alert('Button works!')} />
			</Card>
		</View>
    </Navigation>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
