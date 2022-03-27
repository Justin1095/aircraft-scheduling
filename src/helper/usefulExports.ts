export const secondsInTheDay = 86400;
export const turnaroundTime = 1200;

export const getPercentage = (a: number, b: number) => (a / b) * 100;

export const getStringPercentage = (a: number, b: number) => {
	const percentage = getPercentage(a, b);
	return `${percentage}%`;
};

export const getFixedStringPercentage = (a: number, b: number) => {
	const percentage = getPercentage(a, b).toFixed(0);
	return `${percentage}%`;
};

export const getSuffix = (day: number) => {
	if (day > 3 && day < 21) return "th";
	switch (day % 10) {
		case 1:
			return "st";
		case 2:
			return "nd";
		case 3:
			return "rd";
		default:
			return "th";
	}
};

export const getDiffer = (a: number, b: number) => Math.abs(a - b);

// Mostly used to find the width for sections in my timeline but could be useful for other things in the future
export const getTimeWidth = (date1: number, date2: number = 0) => {
	const differ = getDiffer(date1, date2);
	return getStringPercentage(differ, secondsInTheDay);
};
