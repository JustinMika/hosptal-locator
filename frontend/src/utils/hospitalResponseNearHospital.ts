import { Hospital } from "../types";
import haversineDistance from "./haversineDistance";

// Trouver l'hôpital le plus proche
const nearest = (
	prev: Hospital,
	curr: Hospital,
	userPosition: [number, number]
) => {
	const prevDistance = haversineDistance(userPosition, [
		prev.latitude,
		prev.longitude,
	]);

	const currDistance = haversineDistance(userPosition, [
		curr.latitude,
		curr.longitude,
	]);
	return prevDistance < currDistance ? prev : curr;
};

export default nearest;
