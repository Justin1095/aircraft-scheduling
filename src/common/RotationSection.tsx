import { FlightData } from "../types";

interface Props {
	flight: FlightData;
	removeFightToRotation: (flight: FlightData) => void;
}

const RotationSection = ({ flight, removeFightToRotation }: Props) => {
	return (
		<div className="lg-pod" onClick={() => removeFightToRotation(flight)}>
			<div className="container">
				<div className="row">
					<div className="col-12">Flight: {flight.id}</div>
				</div>
				{/* <i className="fa-solid fa-right"></i> */}
				<div className="row">
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
		</div>
	);
};

export default RotationSection;
