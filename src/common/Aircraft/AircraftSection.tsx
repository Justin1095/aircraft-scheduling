import { AircraftData } from "../../types";
import Aircraft from "./Aircraft";

interface Props {
	aircrafts: AircraftData[] | undefined;
}

const Aircrafts = ({ aircrafts }: Props) => {
	return (
		<div>
			<div>Aircrafts</div>
			{aircrafts?.map((aircraft) => (
				<Aircraft aircraft={aircraft} />
			))}
		</div>
	);
};

export default Aircrafts;
