import React, { useEffect, useRef, useState } from "react";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	Circle,
	useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import useGeolocation from "./useGeolocation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Hospital } from "../../types";
import axios from "axios";
import haversineDistance from "../../utils/haversineDistance";
import getMainUrlApi from "../../utils/getMainUrlApi";
import getAccuracyMessage from "../../utils/getAccuracyMessage";
import CustomZoomControl from "./CustomZoomControl";

const hospitalIcon = new L.Icon({
	iconUrl: "/images/hopitalIcon.png", // Assurez-vous que le chemin est correct
	iconSize: [32, 32], // Taille de l'icône
	iconAnchor: [12, 24], // Point de l'icône qui correspondra à la position du marqueur
	popupAnchor: [0, -24], // Point de l'icône où se trouve le popup
});

const UpdateMapCenter: React.FC<{ position: [number, number] }> = ({
	position,
}) => {
	const map = useMap();

	useEffect(() => {
		map.setView(position, map.getZoom());
	}, [position, map]);

	return null;
};

const MapComponent: React.FC = () => {
	const [hospitals, setHospitals] = useState<Hospital[]>([]);
	const [nearestHospital, setNearestHospital] = useState<Hospital>();

	const { position } = useGeolocation();
	const [mapPosition, setMapPosition] = useState<
		[number, number] | undefined
	>();
	const defaultCenter: [number, number] = [-1.6885276, 29.2322494];

	const userMarkerRef = useRef<L.Marker>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [hospitalResponse] = await Promise.all([
					axios.get(`${getMainUrlApi()}hospitals/hospital`),
				]);

				setHospitals(hospitalResponse.data);

				if (position) {
					const userPosition: [number, number] = [
						position.latitude,
						position.longitude,
					];
					setMapPosition(userPosition);

					// Trouver l'hôpital le plus proche
					const nearest = hospitalResponse.data.reduce(
						(prev: Hospital, curr: Hospital) => {
							const prevDistance = haversineDistance(
								userPosition,
								[prev.latitude, prev.longitude]
							);
							const currDistance = haversineDistance(
								userPosition,
								[curr.latitude, curr.longitude]
							);
							return prevDistance < currDistance ? prev : curr;
						},
						hospitalResponse.data[0]
					);

					setNearestHospital(nearest);
				}
			} catch (error) {
				console.error("Error fetching data.");
			}
		};

		fetchData();
	}, [position]);

	return (
		<>
			{!hospitals ? (
				<p className="text-2xl text-gray-400 dark:text-gray-500 text-center flex flex-col justify-center items-center gap-6">
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
					<h3 className="text-gray-500 italic text-center">
						Chargement des hopitaux encours, ...
					</h3>
				</p>
			) : (
				""
			)}

			{hospitals && (
				<MapContainer
					center={mapPosition || defaultCenter}
					zoom={12}
					style={{ height: "89vh", width: "100%" }}
				>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>
					{mapPosition && (
						<>
							<Marker position={mapPosition} ref={userMarkerRef}>
								<Popup>
									Vous êtes ici. <br />
									Précision: {position?.accuracy.toFixed(
										2
									)}{" "}
									mètres (
									{getAccuracyMessage(
										position?.accuracy ?? 0
									)}
									). <br />
									Lat : {position?.latitude ?? "NaN"}; Long:{" "}
									{position?.longitude ?? "NaN"}
								</Popup>
							</Marker>
							<Circle
								center={mapPosition}
								radius={3000} // Rayon de 3 km
								color="blue"
								fillColor="blue"
								fillOpacity={0.3}
							/>
							{hospitals.map((hospital) => (
								<Marker
									key={hospital.id}
									position={[
										hospital.latitude,
										hospital.longitude,
									]}
									icon={hospitalIcon}
								>
									<Popup>
										Hopital : {hospital.pseudo} <br />
										Lat : {hospital?.latitude ?? "NaN"};
										Long: {hospital?.longitude ?? "NaN"}{" "}
										<br />
										Précision: Environs{" "}
										{haversineDistance(
											[
												hospital.latitude,
												hospital.longitude,
											],
											mapPosition
										)}{" "}
										km
									</Popup>
								</Marker>
							))}
							<UpdateMapCenter position={mapPosition} />
						</>
					)}
					<CustomZoomControl
						nearestHospital={nearestHospital ?? undefined}
						positionUser={mapPosition}
					/>
				</MapContainer>
			)}

			<ToastContainer />
		</>
	);
};

export default MapComponent;
