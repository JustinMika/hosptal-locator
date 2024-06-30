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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Hospital } from "../../types";
import axios from "axios";
import haversineDistance from "../../utils/haversineDistance";
import getMainUrlApi from "../../utils/getMainUrlApi";

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

const CustomZoomControl: React.FC = () => {
	const map = useMap();

	const zoomIn = () => {
		map.setZoom(map.getZoom() + 1);
	};

	const zoomOut = () => {
		map.setZoom(map.getZoom() - 1);
	};

	return (
		<div
			className="zoom-controls_ flex justify-between items-center gap-5"
			style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}
		>
			<button className="flex flex-col justify-center items-center w-full bg-red-600 p-2 gap-2 rounded-full animate-ping" onClick={() => {
				alert("ALert")
			}}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6 text-white"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
					/>
				</svg>
				<span className="text-white font-bold">Alerter</span>
			</button>
			<button
				onClick={zoomIn}
				// style={{ display: "block", marginBottom: 5 }}
				className="flex flex-col justify-center items-center w-full"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 4.5v15m7.5-7.5h-15"
					/>
				</svg>
				<span className="text-white font-bold">Zoom In</span>
			</button>
			<button
				onClick={zoomOut}
				className="flex flex-col justify-center items-center w-full"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6 items-center"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M5 12h14"
					/>
				</svg>
				<span className="text-white font-bold">Zoom Out</span>
			</button>
		</div>
	);
};

const getAccuracyMessage = (accuracy: number) => {
	if (accuracy <= 10) return "Précision élevée";
	if (accuracy <= 50) return "Précision moyenne";
	return "Précision faible";
};

const RoutingControl: React.FC<{
	from: [number, number];
	to: [number, number];
}> = ({ from, to }) => {
	const map = useMap();

	useEffect(() => {
		const routingControl = L.Routing.control({
			waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])],
			lineOptions: {
				styles: [{ color: "blue", weight: 4 }],
			},
			createMarker: () => null, // Pour éviter de créer des marqueurs supplémentaires
			show: false,
			addWaypoints: false,
		}).addTo(map);

		return () => {
			map.removeControl(routingControl);
		};
	}, [from, to, map]);

	return null;
};

const MapComponent: React.FC = () => {
	const [hospitals, setHospitals] = useState<Hospital[]>([]);
	const [nearestHospital, setNearestHospital] = useState<Hospital | null>(
		null
	);

	const { position } = useGeolocation();
	const [mapPosition, setMapPosition] = useState<[number, number] | null>(
		null
	);
	const defaultCenter: [number, number] = [-1.6885276, 29.2322494];

	const userMarkerRef = useRef<L.Marker>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [hospitalResponse] = await Promise.all([
					axios.get(`${getMainUrlApi()}hospitals/hopital`),
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
				console.error("Error fetching data:");
				toast.error("Error fetching data.");
			}
		};

		fetchData();
	}, [position]);

	useEffect(() => {
		if (userMarkerRef.current) {
			userMarkerRef.current.openPopup();
		}
	}, [mapPosition]);

	return (
		<>
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
								Votre poste actuel Vous êtes ici. <br />
								Précision: {position?.accuracy.toFixed(2)}{" "}
								mètres (
								{getAccuracyMessage(position?.accuracy ?? 0)}).{" "}
								<br />
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
									Lat : {hospital?.latitude ?? "NaN"}; Long:{" "}
									{hospital?.longitude ?? "NaN"} <br />
									Précision: Environs{" "}
									{haversineDistance(
										[hospital.latitude, hospital.longitude],
										mapPosition
									)}{" "}
									km
								</Popup>
							</Marker>
						))}
						{nearestHospital && (
							<RoutingControl
								from={mapPosition}
								to={[
									nearestHospital.latitude,
									nearestHospital.longitude,
								]}
							/>
						)}
						<UpdateMapCenter position={mapPosition} />
					</>
				)}
				<CustomZoomControl />
			</MapContainer>
			<ToastContainer />
		</>
	);
};

export default MapComponent;
