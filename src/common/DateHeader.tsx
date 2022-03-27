import { getSuffix } from "../helper/usefulExports";

interface Props {
	date: Date;
}

const DateHeader = ({ date }: Props) => {
	const day = date.getDate();
	const month = date.toLocaleString("default", { month: "long" });

	const dateFormatted = ` ${day}${getSuffix(
		day
	)} ${month} ${date.getFullYear()} `;

	return (
		<h3 className="date-header">
			<span style={{ cursor: "pointer" }}>&lt;</span>
			<span>{dateFormatted}</span>
			<span style={{ cursor: "pointer" }}>&gt;</span>
		</h3>
	);
};

export default DateHeader;
