import { FlightData } from "../../types";
import Flight from "./Flight";

interface Props {
	flights: FlightData[] | undefined;
}

const FlightSection = ({ flights }: Props) => {
	return (
		<div>
			<div>Flights</div>
			{flights?.map((flight) => (
				<Flight flight={flight} />
			))}
		</div>
	);
};

export default FlightSection;
