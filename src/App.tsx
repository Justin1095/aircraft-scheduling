import { useEffect, useMemo, useState } from "react";
import { fetchAircraftData, fetchFlightData } from "./Api";
import "./App.css";
import AircraftSection from "./common/AircraftSection";
import AircraftTimeline from "./common/AircraftTimeline";
import DateHeader from "./common/DateHeader";
import FlightSection from "./common/FlightSection";
import RotationSection from "./common/RotationSection";
import { turnaroundTime } from "./helper/usefulExports";
import {
	AircraftData,
	FlightData,
	ReponseAircraftData,
	ReponseFlightData,
} from "./types";

function App() {
	const currentDate = new Date();
	const tomorrowDate = new Date(currentDate);
	tomorrowDate.setDate(tomorrowDate.getDate() + 1);
	const [aircraftData, setAircraftData] = useState<AircraftData[]>();
	const [flightData, setFlightData] = useState<FlightData[]>([]);
	const [savedFlightData, setSavedFlightData] = useState<FlightData[]>([]);
	const [rotationData, setRotationData] = useState<FlightData[]>([]);
	const [selectedAircraft, setSelectedAircraft] = useState<AircraftData>();

	// fetches aircraft and flight data
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

	// sort flights by departure time
	const sortedFlights = useMemo(
		() => flightData.sort((f1, f2) => f1.departuretime - f2.departuretime),
		[flightData]
	);
	const addFightToRotation = (selectedFlight: FlightData) => {
		const newRotationData = [...rotationData, selectedFlight];
		setRotationData(newRotationData);

		const fliterFights = savedFlightData.filter(
			(flight) =>
				flight.id !== selectedFlight.id &&
				flight.origin === selectedFlight.destination &&
				flight.departuretime >= selectedFlight.arrivaltime + turnaroundTime
		);
		setFlightData(fliterFights);
	};

	// removes last flight in rotation
	const removeLastFightInRotation = (selectedFlight: FlightData) => {
		if (rotationData[rotationData.length - 1].id === selectedFlight.id) {
			const newRotationData = rotationData.filter(
				(flight) => flight.id !== selectedFlight.id
			);
			setRotationData(newRotationData);

			if (rotationData.length - 1 === 0) {
				setFlightData(savedFlightData);
			} else {
				const preSelectedFlight = rotationData[rotationData.length - 2];
				const fliterFights = savedFlightData.filter(
					(flight) =>
						flight.id !== preSelectedFlight.id &&
						flight.origin === preSelectedFlight.destination &&
						flight.departuretime >=
							preSelectedFlight.arrivaltime + turnaroundTime
				);
				setFlightData(fliterFights);
			}
		}
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
							rotationData?.map((flight, i) => (
								<RotationSection
									key={i}
									index={i}
									flight={flight}
									removeLastFightInRotation={removeLastFightInRotation}
									rotationDataLength={rotationData.length}
								/>
							))}
						{displayTimeLine ? (
							<AircraftTimeline
								rotationData={rotationData}
								selectedAircraftId={selectedAircraft?.ident}
							/>
						) : (
							<div>
								Please select an Aircraft and Flights in order to see the
								Rotation Flights.
							</div>
						)}
					</div>
					<div className="col-3">
						<div>Flights</div>
						<hr />
						{selectedAircraft ? (
							sortedFlights?.map((flight) => (
								<FlightSection
									key={flight.id}
									flight={flight}
									addFightToRotation={addFightToRotation}
								/>
							))
						) : (
							<div>Please select an Aircraft in order to see Flights.</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
