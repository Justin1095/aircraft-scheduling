import { AircraftData, FlightData } from "../types";
import {
	getFixedStringPercentage,
	secondsInTheDay,
} from "../helper/usefulExports";

interface Props {
	aircraft: AircraftData;
	rotationData: FlightData[];
	handleSelectAircaft: (aircraft: AircraftData) => void;
}

const Aircrafts = ({ aircraft, rotationData, handleSelectAircaft }: Props) => {
	// finds aircraft's utilisation in percent
	const getUtilisation = (rotationData: FlightData[]) => {
		const usage = rotationData.reduce(
			(sum, flight) => sum + (flight.arrivaltime - flight.departuretime),
			0
		);
		return getFixedStringPercentage(usage, secondsInTheDay);
	};

	return (
		<div className="sm-pod" onClick={() => handleSelectAircaft(aircraft)}>
			<div>{aircraft.ident}</div>
			<div>({getUtilisation(rotationData)})</div>
		</div>
	);
};

export default Aircrafts;
