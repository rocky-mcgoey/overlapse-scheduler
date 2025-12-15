import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

/**
 * Reusable Button Component
 *
 * @param {string} title - Button text
 * @param {function} onPress - Callback function when button is pressed
 * @param {string} variant - Style variant: 'primary', 'secondary', 'danger', 'outline'
 * @param {boolean} disabled - Whether button is disabled
 * @param {boolean} loading - Whether to show loading spinner
 * @param {string} size - Size: 'small', 'medium', 'large'
 * @param {string} className - Additional Tailwind classes
 */
export default function Button({
	title,
	onPress,
	variant = 'primary',
	disabled = false,
	loading = false,
	size = 'medium',
	className = '',
	...props
}) {
  // background color based on variant prop, defaults to primary
  // we can just change these if we want, just adding tese style for now to move fast
	const getBackgroundColor = () => {
		if (disabled) return 'bg-gray-300';

		switch (variant) {
			case 'primary':
				return 'bg-blue-600 active:bg-blue-700';
			case 'secondary':
				return 'bg-gray-600 active:bg-gray-700';
			case 'danger':
				return 'bg-red-600 active:bg-red-700';
			case 'outline':
				return 'bg-transparent border-2 border-blue-600';
			default:
				return 'bg-blue-600 active:bg-blue-700';
		}
	};


	const getTextColor = () => {
		if (disabled) return 'text-gray-500';
		if (variant === 'outline') return 'text-blue-600';
		return 'text-white';
	};

	const getPadding = () => {
		switch (size) {
			case 'small':
				return 'py-2 px-4';
			case 'medium':
				return 'py-3 px-6';
			case 'large':
				return 'py-4 px-8';
			default:
				return 'py-3 px-6';
		}
	};

	// font size prop
	const getFontSize = () => {
		switch (size) {
			case 'small':
				return 'text-sm';
			case 'medium':
				return 'text-base';
			case 'large':
				return 'text-lg';
			default:
				return 'text-base';
		}
	};

	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={disabled || loading}
			className={`
        ${getBackgroundColor()}
        ${getPadding()}
        rounded-lg
        flex-row
        items-center
        justify-center
        ${disabled ? 'opacity-50' : 'opacity-100'}
        ${className}
      `
				.trim()
				.replace(/\s+/g, ' ')}
			{...props}
		>
			{loading && (
				<ActivityIndicator
					size='small'
					color={variant === 'outline' ? '#2563eb' : '#ffffff'}
					style={{ marginRight: 8 }}
				/>
			)}
			<Text
				className={`${getTextColor()} ${getFontSize()} font-semibold text-center`}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
}
