import { AircraftData } from "../types";

interface Props {
	aircraft: AircraftData;
	handleSelectAircaft: (aircraft: AircraftData) => void;
}

const Aircrafts = ({ aircraft, handleSelectAircaft }: Props) => {
	return (
		<div className="sm-pod" onClick={() => handleSelectAircaft(aircraft)}>
			<div>{aircraft.ident}</div>
		</div>
	);
};

export default Aircrafts;
