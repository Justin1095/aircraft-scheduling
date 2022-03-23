export interface AircraftData {
	ident: string;
	type: string;
	economySeats: number;
	base: string;
}

export interface FlightData {
	id: string;
	departuretime: number;
	arrivaltime: number;
	readable_departure: string;
	readable_arrival: string;
	origin: string;
	destination: string;
}

export interface Pagination {
	offset: number;
	limit: number;
	total: number;
}

export interface ReponseAircraftData {
	pagination: Pagination;
	data: AircraftData[];
}

export interface ReponseFlightData {
	pagination: Pagination;
	data: FlightData[];
}
