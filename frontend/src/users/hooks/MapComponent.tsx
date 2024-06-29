import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useGeolocation from "./useGeolocation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Hospital } from "../../types";
import axios from "axios";
import haversineDistance from "../../utils/haversineDistance";

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
			className="zoom-controls"
			style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}
		>
			<button
				onClick={zoomIn}
				style={{ display: "block", marginBottom: 5 }}
			>
				Zoom In
			</button>
			<button onClick={zoomOut} style={{ display: "block" }}>
				Zoom Out
			</button>
		</div>
	);
};

const getAccuracyMessage = (accuracy: number) => {
	if (accuracy <= 10) return "Précision élevée";
	if (accuracy <= 50) return "Précision moyenne";
	return "Précision faible";
};

const MapComponent: React.FC = () => {
	const [hospitals, setHospitals] = useState<Hospital[]>([]);

	useEffect(() => {
		// Récupérer la localisation des hôpitaux depuis le backend
		axios
			.get("http://localhost:2000/api/v1/hospitals/hopital")
			.then((response) => {
				setHospitals(response.data);
			})
			.catch((error) => {
				console.error("Error fetching hospitals:", error);
				toast.error("Error fetching hospitals");
			});
	}, []);

	const { position } = useGeolocation();
	const [mapPosition, setMapPosition] = useState<[number, number] | null>(
		null
	);
	const defaultCenter: [number, number] = [-1.6738835, 29.2257584];

	useEffect(() => {
		if (position) {
			setMapPosition([position.latitude, position.longitude]);
		}
	}, [position]);

	// console.log("H: " + hospitals);

	return (
		<>
			<MapContainer
				center={mapPosition || defaultCenter}
				zoom={15}
				style={{ height: "89vh", width: "100%" }}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
				{mapPosition && (
					<>
						<Marker position={mapPosition}>
							<Popup>
								Votre poste actuel Vous êtes ici. <br />
								Précision: {position?.accuracy} mètres (
								{getAccuracyMessage(position?.accuracy ?? 0)}).{" "}
								<br />
								Lat : {position?.latitude ?? "NaN"}; Long:{" "}
								{position?.longitude ?? "NaN"}
							</Popup>
						</Marker>
						{hospitals.map((hospital) => (
							<Marker
								key={hospital.id}
								position={[
									hospital.latitude,
									hospital.longitude,
								]}
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
