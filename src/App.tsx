import { useEffect, useState } from "react";
import { fetchAircraftData, fetchFlightData } from "./Api";
import "./App.css";
import AircraftSection from "./common/Aircraft/AircraftSection";
import DateHeader from "./common/DateHeader";
import FlightSection from "./common/Flights/FlightSection";
import Rotation from "./common/Rotation";
import {
	AircraftData,
	FlightData,
	ReponseAircraftData,
	ReponseFlightData,
} from "./types";

function App() {
	const currentDay = new Date();
	const [aircraftData, setAircraftData] = useState<AircraftData[]>();
	const [flightData, setFlightData] = useState<FlightData[]>();

	useEffect(() => {
		fetchAircraftData().then((response: ReponseAircraftData) => {
			console.log(response);
			if (!response) return;
			setAircraftData(response.data);
		});

		fetchFlightData().then((response: ReponseFlightData) => {
			if (response) {
				setFlightData(response.data);
			}
		});
	}, []);

	return (
		<div className="wrapper">
			<div className="container">
				<DateHeader date={currentDay} />
				<div className="row">
					<div className="col-3">
						<AircraftSection aircrafts={aircraftData} />
					</div>
					<div className="col-6">
						<Rotation />
					</div>
					<div className="col-3">
						<FlightSection flights={flightData} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
