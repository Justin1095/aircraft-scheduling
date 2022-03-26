import { useEffect, useState } from "react";
import { FlightData, TimelineFights } from "../types";

interface Props {
	rotationData: FlightData[];
}

const AircraftTimeline = ({ rotationData }: Props) => {
	const secondsInTheDay = 86400;
	const turnaround = 1440;
	const idleColor = "#EFEFEF";
	const scheduledColor = "#008000";
	const turnaroundColor = "#800080";
	const [timelineFights, setTimelineFights] = useState<TimelineFights[]>([]);

	// Used to find the width for sections in my timeline
	const getWidth = (date1: number, date2: number = 0) => {
		const getDiffer = Math.abs(date1 - date2);
		const getPercentage = (getDiffer / secondsInTheDay) * 100;
		return `${getPercentage}%`;
	};

	// wip
	const timeline = (rotationData: FlightData[]) => {
		let width;
		const timeArray = Array<TimelineFights>();

		rotationData.forEach((flight, i) => {
			// Plan - use get width to find what parts of my timeline need different colors
			setTimelineFights(timeArray);
		});
	};

	useEffect(() => timeline(rotationData), [rotationData]);

	return (
		<div>
			<div className="time-section">
				<div>0:00</div>
				<div>12:00</div>
				<div>24:00</div>
			</div>
			<hr />
			<div className="timeline">
				{timelineFights.map((flight, i) => (
					<div
						key={i}
						style={{
							width: flight.width,
							backgroundColor: flight.color,
							height: 50,
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default AircraftTimeline;
