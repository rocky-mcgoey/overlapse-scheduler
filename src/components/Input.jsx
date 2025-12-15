import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

/**
 * Reusable Input Component
 *
 * @param {string} label - Input label text
 * @param {string} value - Current input value
 * @param {function} onChangeText - Callback when text changes
 * @param {string} placeholder - Placeholder text
 * @param {boolean} error - Whether input has validation error
 * @param {string} errorMessage - Error message to display
 * @param {boolean} secureTextEntry - Whether to hide text (for passwords)
 * @param {string} keyboardType - Keyboard type ('default', 'email-address', 'numeric', etc.)
 * @param {boolean} multiline - Whether input should be multiline
 * @param {number} numberOfLines - Number of lines for multiline input
 * @param {string} className - Additional Tailwind classes
 */
export default function Input({
	label,
	value,
	onChangeText,
	placeholder = '',
	error = false,
	errorMessage = '',
	secureTextEntry = false,
	keyboardType = 'default',
	multiline = false,
	numberOfLines = 1,
	className = '',
	icon,
	...props
}) {
	const [isFocused, setIsFocused] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const getBorderColor = () => {
		if (error) return 'border-red-500';
		if (isFocused) return 'border-blue-500';
		return 'border-gray-300';
	};

	return (
		<View className={`mb-4 ${className}`}>
			{/* inout label */}
			{label && (
				<Text className='text-gray-700 mb-2 font-medium text-sm'>{label}</Text>
			)}

			{/* actual input area */}
			<View className='relative'>
				<TextInput
					value={value}
					onChangeText={onChangeText}
					placeholder={placeholder}
					placeholderTextColor='#9CA3AF'
					secureTextEntry={secureTextEntry && !showPassword}
					keyboardType={keyboardType}
					multiline={multiline}
					numberOfLines={numberOfLines}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					className={`
            border
            ${getBorderColor()}
            rounded-lg
            px-4
            ${multiline ? 'py-3' : 'py-3'}
            bg-white
            text-gray-900
            text-base
          `
						.trim()
						.replace(/\s+/g, ' ')}
					style={multiline ? { textAlignVertical: 'top' } : {}}
					{...props}
				/>

				{/* show password toggling */}
				{secureTextEntry && (
					<TouchableOpacity
						onPress={() => setShowPassword(!showPassword)}
						className='absolute right-3 top-3'
					>
						<Text className='text-blue-600 text-sm font-medium'>
							{showPassword ? 'Hide' : 'Show'}
						</Text>
					</TouchableOpacity>
				)}
			</View>

			{/* Error output appears here */}
			{error && errorMessage && (
				<Text className='text-red-500 text-xs mt-1 ml-1'>{errorMessage}</Text>
			)}
		</View>
	);
}
