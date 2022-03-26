import { useEffect, useMemo, useState } from "react";
import { fetchAircraftData, fetchFlightData } from "./Api";
import "./App.css";
import AircraftSection from "./common/AircraftSection";
import AircraftTimeline from "./common/AircraftTimeline";
import DateHeader from "./common/DateHeader";
import FlightSection from "./common/FlightSection";
import RotationSection from "./common/RotationSection";
import {
	AircraftData,
	FlightData,
	ReponseAircraftData,
	ReponseFlightData,
} from "./types";

/*
	Need to do:
	- styling
	- timeline
	- remove rotation buttons 
	- need % for Aircrafts
	- need to update my assumptions
*/

function App() {
	const currentDay = new Date();
	const [aircraftData, setAircraftData] = useState<AircraftData[]>();
	const [flightData, setFlightData] = useState<FlightData[]>([]);
	const [SavedflightData, setSavedFlightData] = useState<FlightData[]>([]);
	const [rotationData, setRotationData] = useState<FlightData[]>([]);
	const [selectedAircraft, setSelectedAircraft] = useState<AircraftData>();

	useEffect(() => {
		fetchAircraftData().then((response: ReponseAircraftData) => {
			if (!response) return;
			setAircraftData(response.data);
		});

		fetchFlightData().then((response: ReponseFlightData) => {
			if (response) {
				setFlightData(response.data);
				setSavedFlightData(response.data);
			}
		});
	}, []);

	// when user clicks the aircraft button, it will reset the rotation and flights section
	const handleSelectAircaft = (aircraft: AircraftData) => {
		setSelectedAircraft(aircraft);
		setRotationData([]);
		setFlightData(SavedflightData);
	};

	// I figureed it would be best to sort but departure time
	const sortedFlights = useMemo(
		() => flightData.sort((a, b) => a.departuretime - b.departuretime),
		[flightData]
	);
	const addFightToRotation = (selectFlight: FlightData) => {
		const newRotationData = [...rotationData, selectFlight];
		setRotationData(newRotationData);

		const fliterFights = SavedflightData.filter(
			(flight) =>
				flight.id !== selectFlight.id &&
				flight.origin === selectFlight.destination &&
				flight.departuretime >= selectFlight.arrivaltime + 1440
		);
		setFlightData(fliterFights);
	};

	// wip
	const removeFightToRotation = (selectFlight: FlightData) => {
		console.log("test");
		// const newRotationData = rotationData.filter(
		// 	(flight) => flight.id === selectFlight.id
		// );
		// setRotationData(newRotationData);
		// setFlightData([]);
		// // const test  = [..., selectFlight];

		// // const fliterFights = flightData.filter(
		// // 	(flight) =>
		// // 		flight.id !== selectFlight.id &&
		// // 		flight.origin === selectFlight.destination &&
		// // 		flight.departuretime >= selectFlight.arrivaltime + 1440
		// // );
		// // setFlightData(fliterFights);
	};

	const displayTimeLine = selectedAircraft && rotationData.length !== 0;

	return (
		<div className="wrapper">
			<div className="container">
				<DateHeader date={currentDay} />
				<div className="row">
					<div className="col-3">
						<div>
							<div>Aircrafts</div>
							<hr />
							{aircraftData?.map((aircraft) => (
								<AircraftSection
									key={aircraft.ident}
									aircraft={aircraft}
									handleSelectAircaft={handleSelectAircaft}
								/>
							))}
						</div>
					</div>
					<div className="col-6">
						<div>Rotation {selectedAircraft?.ident}</div>
						<hr />
						{selectedAircraft &&
							rotationData?.map((flight, index) => (
								<RotationSection
									key={index}
									flight={flight}
									removeFightToRotation={removeFightToRotation}
								/>
							))}
						{displayTimeLine && (
							<AircraftTimeline rotationData={rotationData} />
						)}
					</div>
					<div className="col-3">
						<div>Flights</div>
						<hr />
						{selectedAircraft &&
							sortedFlights?.map((flight) => (
								<FlightSection
									key={flight.id}
									flight={flight}
									addFightToRotation={addFightToRotation}
								/>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
