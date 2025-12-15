import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card, Input, ScheduleGrid } from './src/components'; // ← Add Card and Input

export default function App() {
	return (
		<View className='flex-1 items-center justify-center bg-gray-50 p-4'>
			<Text>Open up App.js to start working on your app!</Text>
			<StatusBar style='auto' />
			<Card title='Test Components'>
				<Input label='Email' placeholder='test@example.com' />
				<Button title='Click Me' onPress={() => alert('Button works!')} />
			</Card>
		</View>
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
