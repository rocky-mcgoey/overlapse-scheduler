import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

/**
 * Reusable Loading Spinner Component
 *
 * @param {string} size - Spinner size: 'small', 'large'
 * @param {string} color - Spinner color (hex code)
 * @param {string} message - Optional loading message
 * @param {boolean} fullscreen - Whether to show fullscreen overlay
 * @param {string} className - Additional Tailwind classes
 */
export default function LoadingSpinner({
	size = 'large',
	color = '#2563eb', // equivalent to tailwindcss blue-600, but used a hexcode because not certain I can apply the className to ActivityIndicator
	message = '',
	fullscreen = false,
	className = '',
}) {
	if (fullscreen) {
		return (
			<View className='absolute inset-0 bg-black/30 flex items-center justify-center z-50'>
				<View className='bg-white rounded-2xl p-6 items-center shadow-xl'>
					<ActivityIndicator size={size} color={color} />
					{message && (
						<Text className='text-gray-700 mt-4 text-base font-medium'>
							{message}
						</Text>
					)}
				</View>
			</View>
		);
	}

	return (
		<View className={`flex items-center justify-center py-8 ${className}`}>
			<ActivityIndicator size={size} color={color} />
			{message && <Text className='text-gray-600 mt-3 text-sm'>{message}</Text>}
		</View>
	);
}

/**
 * inline spinner -- for using inside small areas, like when you click a button and it shows a loader within the eleemtn
 */
export function InlineSpinner({ size = 'small', color = '#ffffff' }) {
	return <ActivityIndicator size={size} color={color} />;
}
