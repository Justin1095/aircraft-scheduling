import { useEffect, useState } from "react";
import { FlightData, TimelineFights } from "../types";
import {
	getTimeWidth,
	secondsInTheDay,
	turnaroundTime,
} from "../helper/usefulExports";

interface Props {
	rotationData: FlightData[];
	selectedAircraftId: string;
}

const AircraftTimeline = ({ rotationData, selectedAircraftId }: Props) => {
	const idleColor = "#D3D3D3";
	const scheduledColor = "#008000";
	const turnaroundColor = "#800080";
	const [timelineFights, setTimelineFights] = useState<TimelineFights[]>([]);

	// finds the widths and colors for idle time, scheduled time and turnaround time
	const timeline = (rotationData: FlightData[]) => {
		let width;
		const timeArray = Array<TimelineFights>();

		rotationData.forEach((flight, i) => {
			// looks for the idle time in the beginning of the flight
			width =
				i === 0
					? getTimeWidth(flight.departuretime)
					: getTimeWidth(
							rotationData[i - 1].arrivaltime + turnaroundTime,
							flight.departuretime
					  );
			timeArray.push({ width: width, color: idleColor });

			// gets our scheduled time flight
			width = getTimeWidth(flight.departuretime, flight.arrivaltime);
			timeArray.push({ width: width, color: scheduledColor });

			// gets our turnaround time
			width = getTimeWidth(turnaroundTime);
			timeArray.push({ width: width, color: turnaroundColor });

			// if at the end, this will fill the rest of the timeline with idle
			if (i === rotationData.length - 1) {
				width = getTimeWidth(flight.arrivaltime, secondsInTheDay);
				timeArray.push({ width: width, color: idleColor });
			}

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
			<br />
			<div className="timeline-desc">
				This timeline displays all selected flights in the rotation for
				aircraft: {selectedAircraftId}
				<br />
				<span style={{ color: scheduledColor }}>Green</span> displays Scheduled
				flights.
				<br />
				<span style={{ color: turnaroundColor }}>Purple</span> displays
				Turnaround time.
				<br />
				Gray displays time when the aircraft is idle.
			</div>
		</div>
	);
};

export default AircraftTimeline;
