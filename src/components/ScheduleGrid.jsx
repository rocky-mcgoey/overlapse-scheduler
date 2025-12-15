import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

/**
 * ScheduleGrid Component
 * Displays a weekly schedule grid where users can mark availability
 *
 * @param {Array} scheduleBlocks - Array of schedule block objects
 * @param {function} onBlockPress - Callback when a time block is pressed
 * @param {boolean} editable - Whether blocks can be toggled
 * @param {string} mode - Display mode: 'edit' or 'view' or 'overlap'
 */

// I should maybe put those in a constants folder but I'm in a hurry right now
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// time slots from 8 AM to 9 PM, but wer can alter that if we need
const TIME_SLOTS = [
	'8 AM',
	'9 AM',
	'10 AM',
	'11 AM',
	'12 PM',
	'1 PM',
	'2 PM',
	'3 PM',
	'4 PM',
	'5 PM',
	'6 PM',
	'7 PM',
	'8 PM',
	'9 PM',
];

export default function ScheduleGrid({
	scheduleBlocks = [],
	onBlockPress,
	editable = true,
	mode = 'edit',
}) {
	/**
	 * Check if a specific time slot is marked as available
	 * @param {number} dayIndex - 0 (Sun) to 6 (Sat)
	 * @param {number} timeIndex - Index in TIME_SLOTS array
  */

  // I have added this logic in, but I don't know if it fits the backend schema really, worried I had the wrong idea about what we're going for with overlapse scheduling? Will remove it if not needed
	const isBlockAvailable = (dayIndex, timeIndex) => {
		return scheduleBlocks.some(
			block =>
				block.day_of_week === dayIndex &&
				block.time_slot === timeIndex &&
				block.is_available
		);
	};

	//  block color returned based on mode and availability
	const getBlockColor = (dayIndex, timeIndex) => {
		const isAvailable = isBlockAvailable(dayIndex, timeIndex);

		if (mode === 'overlap') {
			// overlap view, show different color for overlapping times
			return isAvailable ? 'bg-green-500' : 'bg-gray-200';
		}

		if (mode === 'view') {
			return isAvailable ? 'bg-blue-400' : 'bg-gray-200';
		}


		return isAvailable ? 'bg-blue-500' : 'bg-gray-100';
	};

	const handleBlockPress = (dayIndex, timeIndex) => {
		if (!editable || !onBlockPress) return;
		onBlockPress(dayIndex, timeIndex);
	};

	return (
		<View className='bg-white rounded-lg'>
			{/* day header */}
			<View className='flex-row border-b border-gray-300'>
				{/* empty calendar cell */}
				<View className='w-16 h-10' />

				{/* weekday label */}
				{DAYS.map((day, index) => (
					<View key={index} className='flex-1 h-10 items-center justify-center'>
						<Text className='text-xs font-semibold text-gray-700'>{day}</Text>
					</View>
				))}
			</View>

			{/* timeslots */}
			<ScrollView className='max-h-96'>
				{TIME_SLOTS.map((time, timeIndex) => (
					<View key={timeIndex} className='flex-row border-b border-gray-200'>
						{/* Time label */}
						<View className='w-16 h-12 justify-center items-center border-r border-gray-300'>
							<Text className='text-xs text-gray-600'>{time}</Text>
						</View>

						{/* day blocks */}
						{DAYS.map((day, dayIndex) => (
							<TouchableOpacity
								key={dayIndex}
								onPress={() => handleBlockPress(dayIndex, timeIndex)}
								disabled={!editable}
								className='flex-1 h-12 border-r border-gray-200'
							>
								<View
									className={`
                  flex-1
                  ${getBlockColor(dayIndex, timeIndex)}
                  ${editable ? 'active:opacity-70' : ''}
                `
										.trim()
										.replace(/\s+/g, ' ')}
								></View>
							</TouchableOpacity>
						))}
					</View>
				))}
			</ScrollView>

			{/* color indicator legend */}
			{mode === 'overlap' && (
				<View className='flex-row justify-center items-center py-3 bg-gray-50 rounded-b-lg'>
					<View className='flex-row items-center mr-4'>
						<View className='w-4 h-4 bg-green-500 rounded mr-2' />
						<Text className='text-xs text-gray-600'>Available for all</Text>
					</View>
					<View className='flex-row items-center'>
						<View className='w-4 h-4 bg-gray-200 rounded mr-2' />
						<Text className='text-xs text-gray-600'>Not available</Text>
					</View>
				</View>
			)}
		</View>
	);
}
