// Function to calculate Haversine distance between two points
const haversineDistance = (
	coords1: [number, number],
	coords2: [number, number]
): number | string => {
	const toRad = (x: number) => (x * Math.PI) / 180;

	const lat1 = coords1[0];
	const lon1 = coords1[1];
	const lat2 = coords2[0];
	const lon2 = coords2[1];

	const R = 6371; // radius of Earth in km
	const dLat = toRad(lat2 - lat1);
	const dLon = toRad(lon2 - lon1);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRad(lat1)) *
			Math.cos(toRad(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const dist = R * c;
	return dist.toFixed(2); // distance in km
};

export default haversineDistance;
