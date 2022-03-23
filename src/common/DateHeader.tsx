interface Props {
	date: Date;
}

const DateHeader = ({ date }: Props) => {
	const day = date.getDate();
	const month = date.toLocaleString("default", { month: "long" });

	const getSuffix = (day: number) => {
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

	const dateFormatted = ` ${day}${getSuffix(
		day
	)} ${month} ${date.getFullYear()} `;
	return (
		<h2 className="date-header">
			<span style={{ cursor: "pointer" }}>&lt;</span>
			<span>{dateFormatted}</span>
			<span style={{ cursor: "pointer" }}>&gt;</span>
		</h2>
	);
};

export default DateHeader;
