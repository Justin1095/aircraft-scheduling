import { FlightData } from "../types";

interface Props {
	flight: FlightData;
	addFightToRotation: (flight: FlightData) => void;
}

const FlightSection = ({ flight, addFightToRotation }: Props) => {
	return (
		<button className="sm-pod" onClick={() => addFightToRotation(flight)}>
			<div className="container">
				<div className="row">
					<div>{flight.id}</div>
					<div className="col-6">
						{flight.origin}
						<br />
						{flight.readable_departure}
					</div>
					<div className="col-6">
						{flight.destination}
						<br />
						{flight.readable_arrival}
					</div>
				</div>
			</div>
		</button>
	);
};

export default FlightSection;
