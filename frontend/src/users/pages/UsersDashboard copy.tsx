/* eslint-disable @typescript-eslint/no-unused-vars */
import AsideDashboard from "../components/AsideDashboard";
import ContentDashBoardUser from "../components/ContentDashBoardUser";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	Hospital,
	LocationMarkerProps,
	RoutingMachineProps,
} from "../../types";

const haversineDistance = (
	coords1: [number, number],
	coords2: [number, number]
): number => {
	const toRad = (x: number) => (x * Math.PI) / 180;

	const lat1 = coords1[0];
	const lon1 = coords1[1];
	const lat2 = coords2[0];
	const lon2 = coords2[1];

	const R = 6371; // radius of Earth in km
	const x1 = lat2 - lat1;
	const dLat = toRad(x1);
	const x2 = lon2 - lon1;
	const dLon = toRad(x2);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRad(lat1)) *
			Math.cos(toRad(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const d = R * c;

	return d; // distance in km
};

const LocationMarker: React.FC<LocationMarkerProps> = ({
	position,
	accuracy,
}) => {
	const map = useMap();

	useEffect(() => {
		if (position) {
			map.setView(position, 13);
		}
	}, [position, map]);

	const getAccuracyMessage = (accuracy: number) => {
		if (accuracy <= 10) return "Précision élevée";
		if (accuracy <= 50) return "Précision moyenne";
		return "Précision faible";
	};

	return position === null ? null : (
		<Marker position={position} icon={new L.Icon.Default()}>
			<Popup>
				Vous êtes ici. <br />
				Précision: {accuracy} mètres (
				{getAccuracyMessage(accuracy ?? 0)}).
			</Popup>
		</Marker>
	);
};

const RoutingMachine: React.FC<RoutingMachineProps> = ({
	position,
	hospital,
}) => {
	const map = useMap();

	useEffect(() => {
		if (position && hospital) {
			// Supprimer les contrôles de routage existants
			map.eachLayer((layer) => {
				if (layer instanceof L.Routing.Control) {
					map.removeLayer(layer);
				}
			});

			// Ajouter un nouveau contrôle de routage
			L.Routing.control({
				waypoints: [
					L.latLng(position[0], position[1]),
					L.latLng(hospital.latitude, hospital.longitude),
				],
				routeWhileDragging: true,
				lineOptions: [],
				createMarker: function () {
					return null;
				}, // Supprimer les marqueurs pour éviter les doublons
			}).addTo(map);
		}
	}, [position, hospital, map]);

	return null;
};

const UsersDashboard: React.FC = () => {
	const [hospitals, setHospitals] = useState<Hospital[]>([]);
	const [userPosition, setUserPosition] = useState<[number, number] | null>(
		null
	);
	const [accuracy, setAccuracy] = useState<number | null>(null);
	const [nearestHospital, setNearestHospital] = useState<Hospital | null>(
		null
	);
	// const [map, setMap] = useState<L.Map | null>(null);
	// const [setPositionSource] = useState<"browser" | "gps">("browser"); // 'browser' or 'gps'

	useEffect(() => {
		// Récupérer la localisation des hôpitaux depuis le backend
		axios
			.get("http://localhost:2000/api/v1/hospitals/")
			.then((response) => setHospitals(response.data))
			.catch((error) =>
				console.error("Error fetching hospitals:", error)
			);

		const getBrowserPosition = (): Promise<GeolocationPosition> => {
			return new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject, {
					enableHighAccuracy: true,
				});
			});
		};

		const getGPSPosition = (): Promise<GeolocationPosition> => {
			return new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject, {
					enableHighAccuracy: true,
				});
			});
		};

		const updatePosition = async () => {
			try {
				const browserPosition = await getBrowserPosition();
				const gpsPosition = await getGPSPosition();

				const browserAccuracy = browserPosition.coords.accuracy;
				const gpsAccuracy = gpsPosition.coords.accuracy;

				if (gpsAccuracy <= browserAccuracy) {
					setUserPosition([
						gpsPosition.coords.latitude,
						gpsPosition.coords.longitude,
					]);
					setAccuracy(gpsAccuracy);
				} else {
					setUserPosition([
						browserPosition.coords.latitude,
						browserPosition.coords.longitude,
					]);
					setAccuracy(browserAccuracy);
				}
			} catch (error) {
				console.error("Error getting user location:", error);
				toast.error(
					"Erreur lors de la récupération de la localisation."
				);
			}
		};

		updatePosition();

		const watchId = navigator.geolocation.watchPosition(
			(position) => {
				if (position.coords.accuracy <= (accuracy || Infinity)) {
					setUserPosition([
						position.coords.latitude,
						position.coords.longitude,
					]);
					setAccuracy(position.coords.accuracy);
				}
			},
			(error) => {
				console.error("Error getting user location:", error);
			},
			{ enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
		);

		// Nettoyage de l'effet pour arrêter de regarder la position lorsqu'elle n'est plus nécessaire
		return () => {
			navigator.geolocation.clearWatch(watchId);
		};
	}, [accuracy]);

	useEffect(() => {
		if (userPosition && hospitals.length > 0) {
			let nearest: Hospital | null = null;
			let minDistance = Infinity;

			hospitals.forEach((hospital) => {
				const distance = haversineDistance(userPosition, [
					hospital.latitude,
					hospital.longitude,
				]);
				if (distance < minDistance) {
					minDistance = distance;
					nearest = hospital;
				}
			});

			setNearestHospital(nearest);
			if (minDistance <= 5) {
				toast.info(
					`L'hôpital le plus proche est à ${minDistance.toFixed(
						3
					)} km.`
				);
			}
		}
	}, [userPosition, hospitals]);

	useEffect(() => {
		if (accuracy !== null && accuracy > 50) {
			toast.warn(
				"Votre précision est faible. Pour améliorer la précision, veuillez activer le GPS de votre appareil."
			);
		}
	}, [accuracy]);

	return (
		<>
			<AsideDashboard />
			<ContentDashBoardUser>
				<div className="flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-md shadow-md h-[95vh]">
					{!hospitals && (
						<p className="text-2xl text-gray-400 dark:text-gray-500">
							<svg
								className="w-12 h-12 animate-spin"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 18 18"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M9 1v16M1 9h16"
								/>
							</svg>
						</p>
					)}

					{hospitals && (
						<div className="App w-full h-screen">
							<MapContainer
								center={[51.505, -0.09]}
								zoom={15}
								style={{ height: "100vh", width: "100%" }}
								// whenReady={(mapInstance) => setMap(mapInstance)}
								// whenReady={(mapInstance: Map) => setMap(mapInstance)}
							>
								<TileLayer
									url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
									attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								/>
								{hospitals.map((hospital) => (
									<Marker
										key={hospital._id}
										position={[
											hospital.latitude,
											hospital.longitude,
										]}
									>
										<Popup>{hospital.name}</Popup>
									</Marker>
								))}
								<LocationMarker
									position={userPosition}
									accuracy={accuracy}
								/>
								{nearestHospital && (
									<RoutingMachine
										position={userPosition}
										hospital={nearestHospital}
									/>
								)}
							</MapContainer>
							<ToastContainer
								position="bottom-right"
								autoClose={5000}
								hideProgressBar={false}
								newestOnTop={false}
								closeOnClick
								rtl={false}
								pauseOnFocusLoss
								draggable
								pauseOnHover
							/>
						</div>
					)}
				</div>
			</ContentDashBoardUser>
		</>
	);
};

export default UsersDashboard;
