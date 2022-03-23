import { FlightData } from "../../types";

interface Props {
	flight: FlightData;
}

const Fight = ({ flight }: Props) => {
	return (
		<div className="sm-pod">
			<div>{flight.origin}</div>
			<div>{flight.destination}</div>
		</div>
	);
};

export default Fight;
