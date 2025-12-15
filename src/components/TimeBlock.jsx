import { TouchableOpacity, View, Text } from 'react-native';

/**
 * TimeBlock Component
 * Represents an individual time slot in a schedule
 *
 * @param {boolean} isAvailable - Whether this time block is marked as available
 * @param {function} onPress - Callback when block is pressed
 * @param {boolean} disabled - Whether block is disabled (non-editable)
 * @param {string} label - Optional label for the block
 * @param {string} variant - Style variant: 'available', 'unavailable', 'overlap'
 */
export default function TimeBlock({
	isAvailable = false,
	onPress,
	disabled = false,
	label = '',
	variant,
	size = 'medium',
}) {
	// bg color
	const getBackgroundColor = () => {
		// if variant set, use that respoective className
		if (variant === 'overlap') return 'bg-green-500';
		if (variant === 'partial') return 'bg-yellow-400';

		// default to available/unavailable styling if no variant set
		return isAvailable ? 'bg-blue-500' : 'bg-gray-100';
	};

	// size variants
	const getSize = () => {
		switch (size) {
			case 'small':
				return 'w-8 h-8';
			case 'medium':
				return 'w-12 h-12';
			case 'large':
				return 'w-16 h-16';
			default:
				return 'w-12 h-12';
		}
	};

	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={disabled}
			activeOpacity={0.7}
			className={`
        ${getSize()}
        ${getBackgroundColor()}
        rounded
        items-center
        justify-center
        border
        border-gray-200
        ${!disabled && 'active:opacity-70'}
      `
				.trim()
				.replace(/\s+/g, ' ')}
		>
			{label && (
				<Text
					className={`
          text-xs
          font-medium
          ${isAvailable ? 'text-white' : 'text-gray-600'}
        `
						.trim()
						.replace(/\s+/g, ' ')}
				>
					{label}
				</Text>
			)}
		</TouchableOpacity>
	);
}

/**
 * TimeBlockRow Component
 * Groups multiple TimeBlocks in a row
 */
export function TimeBlockRow({ children, label, className = '' }) {
	return (
		<View className={`flex-row items-center mb-2 ${className}`}>
			{label && (
				<Text className='text-sm text-gray-700 w-16 mr-2'>{label}</Text>
			)}
			<View className='flex-row flex-1 justify-around'>{children}</View>
		</View>
	);
}
