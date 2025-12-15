import { View, Text, TouchableOpacity } from 'react-native';

/**
 * Reusable Card Component
 *
 * @param {ReactNode} children - Card content
 * @param {string} title - Optional card title
 * @param {string} subtitle - Optional card subtitle
 * @param {function} onPress - Optional callback to make card pressable
 * @param {string} variant - Style variant: 'default', 'outlined', 'elevated'
 * @param {string} className - Additional Tailwind classes
 */
export default function Card({
	children,
	title,
	subtitle,
	onPress,
	variant = 'default',
	className = '',
	...props
}) {

	const getCardStyle = () => {
		switch (variant) {
			case 'outlined':
				return 'bg-white border-2 border-gray-200';
			case 'elevated':
				return 'bg-white shadow-lg';
			case 'default':
			default:
				return 'bg-white shadow-md';
		}
	};

	const CardContent = () => (
		<View
			className={`
        ${getCardStyle()}
        rounded-xl
        p-4
        ${className}
      `
				.trim()
				.replace(/\s+/g, ' ')}
			{...props}
		>
			{/* header section */}
			{(title || subtitle) && (
				<View className='mb-3'>
					{title && (
						<Text className='text-lg font-bold text-gray-900 mb-1'>
							{title}
						</Text>
					)}
					{subtitle && (
						<Text className='text-sm text-gray-600'>{subtitle}</Text>
					)}
				</View>
			)}

			{/* child elements placed in between the opening and closing <Card>{children}</Card> */}
			{children}
		</View>
	);

	// If onPress is provided, make the card touchable
	if (onPress) {
		return (
			<TouchableOpacity onPress={onPress} activeOpacity={0.7}>
				<CardContent />
			</TouchableOpacity>
		);
	}

	return <CardContent />;
}

/**
 * for organizing content within a Card
 */
export function CardSection({ children, title, className = '' }) {
	return (
		<View className={`py-2 ${className}`}>
			{title && (
				<Text className='text-sm font-semibold text-gray-700 mb-2'>
					{title}
				</Text>
			)}
			{children}
		</View>
	);
}

/**
 * footer
 */
export function CardFooter({ children, className = '' }) {
	return (
		<View
			className={`pt-3 mt-3 border-t border-gray-200 flex-row justify-end ${className}`}
		>
			{children}
		</View>
	);
}
