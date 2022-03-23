import { AircraftData } from "../../types";

interface Props {
	aircraft: AircraftData;
}

const Aircraft = ({ aircraft }: Props) => {
	return (
		<div className="sm-pod">
			<div>{aircraft.ident}</div>
		</div>
	);
};

export default Aircraft;
