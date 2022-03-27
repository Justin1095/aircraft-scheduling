import { FlightData } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
interface Props {
	index: number;
	flight: FlightData;
	removeLastFightInRotation: (flight: FlightData) => void;
	rotationDataLength: number;
}

const RotationSection = ({
	index,
	flight,
	removeLastFightInRotation,
	rotationDataLength,
}: Props) => {
	return (
		<div
			className={`lg-pod ${index === rotationDataLength - 1 && "add-pointer"}`}
			onClick={() => removeLastFightInRotation(flight)}
		>
			<div className="container">
				<div className="row">
					<div className="col-4">Flight: {flight.id}</div>
				</div>
				<br />
				<div className="row">
					<div className="col-4">
						{flight.origin}
						<br />
						{flight.readable_departure}
					</div>
					<div className="col-4">
						<FontAwesomeIcon icon={faArrowRightLong} size="3x" />
					</div>
					<div className="col-4">
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
