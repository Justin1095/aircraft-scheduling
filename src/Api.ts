export const fetchAircraftData = () => {
	return fetch("https://infinite-dawn-93085.herokuapp.com/aircrafts")
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
		})
		.catch((error) => {
			console.log(error);
			throw error;
		});
};

export const fetchFlightData = () => {
	return fetch("https://infinite-dawn-93085.herokuapp.com/flights")
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
		})
		.catch((error) => {
			console.log(error);
			throw error;
		});
};
