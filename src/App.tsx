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
		- styling (Fixed rotation)
	- remove rotation buttons 
		- need to update my assumptions
		- comments

	Asumpitions:
	- The date on the header will display tomorrow's date because the assessment description states, "Only one day worth of schedule can be entered (“tomorrow”)."
	- Page will initally load with only the Aircrafts. Once an aircraft is selected, then the Flights will display.
	- Rotation and Timeline will display once a Flight is selected. 
	- Timeline has a description expaining it.
	- When clicking on an aircraft, it resets the Rotation and Flights.
	- The FLights are sorted by departure time
	- the arrows in the header date should move the day back or forward (I did not add the functionality in)

	Future Plans: 
	- add jest unit testing
	- add functionality to the date header arrows 
	- make the page be more visually pleasing
*/

function App() {
	const currentDate = new Date();
	const tomorrowDate = new Date(currentDate);
	tomorrowDate.setDate(tomorrowDate.getDate() + 1);
	const [aircraftData, setAircraftData] = useState<AircraftData[]>();
	const [flightData, setFlightData] = useState<FlightData[]>([]);
	const [savedFlightData, setSavedFlightData] = useState<FlightData[]>([]);
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
		setFlightData(savedFlightData);
	};

	// Figured it would be best to sort by departure time
	const sortedFlights = useMemo(
		() => flightData.sort((f1, f2) => f1.departuretime - f2.departuretime),
		[flightData]
	);
	const addFightToRotation = (selectFlight: FlightData) => {
		const newRotationData = [...rotationData, selectFlight];
		setRotationData(newRotationData);

		const fliterFights = savedFlightData.filter(
			(flight) =>
				flight.id !== selectFlight.id &&
				flight.origin === selectFlight.destination &&
				flight.departuretime >= selectFlight.arrivaltime + 1200
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
		// // 		flight.departuretime >= selectFlight.arrivaltime + 1200
		// // );
		// // setFlightData(fliterFights);
	};

	const displayTimeLine = selectedAircraft && rotationData.length !== 0;

	return (
		<div className="wrapper">
			<div className="container">
				<DateHeader date={tomorrowDate} />
				<div className="row">
					<div className="col-3">
						<div>
							<div>Aircrafts</div>
							<hr />
							{aircraftData?.map((aircraft) => (
								<AircraftSection
									key={aircraft.ident}
									aircraft={aircraft}
									rotationData={rotationData}
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
							<AircraftTimeline
								rotationData={rotationData}
								selectedAircraftId={selectedAircraft?.ident}
							/>
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
