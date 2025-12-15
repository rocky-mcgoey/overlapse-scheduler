import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card, Input, ScheduleGrid } from './src/components'; // ← Add Card and Input
import { createStaticNavigation } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import AboutScreen from './src/screens/AboutScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import ScheduleScreen from './src/screens/ScheduleScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const stack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
    About: AboutScreen,
    Login: LoginScreen,
    Signup: SignupScreen,
    Schedule: ScheduleScreen,
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
