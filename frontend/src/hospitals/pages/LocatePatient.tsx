import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import ContentAdmin from "../components/ContentAdmin";
import L from "leaflet";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
	Circle,
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
} from "react-leaflet";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

const hospitalIcon = new L.Icon({
	iconUrl: "/images/hopitalIcon.png",
	iconSize: [32, 32],
	iconAnchor: [12, 24],
	popupAnchor: [0, -24],
});
export interface RoutingMachineProps {
	position: [number, number] | null;
	positionUser: [number, number] | null;
}

const RoutingMachine: React.FC<RoutingMachineProps> = ({
	position,
	positionUser,
}) => {
	const map = useMap();

	useEffect(() => {
		if (position && position) {
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
					L.latLng(positionUser?.[0] ?? 0, positionUser?.[1] ?? 0),
				],
				routeWhileDragging: true,
				lineOptions: [],
				createMarker: function () {
					return null;
				}, // Supprimer les marqueurs pour éviter les doublons
			}).addTo(map);
		}
	}, [position, map, positionUser]);

	return null;
};

const LocatePatient: React.FC = () => {
	const user = useSelector((state: RootState) => state.user);
	axios.defaults.withCredentials = true;
	localStorage.setItem("page", "Alerte des utilisateurs");
	window.document.title = "Alerte des utilisateurs";

	const [mapPosition, setMapPosition] = useState<[number, number]>();

	const [mapUserPosition, setMapUserPosition] = useState<[number, number]>();

	const { lat, long } = useParams<{ lat: string; long: string }>();
	const defaultCenter: [number, number] = [-1.6885276, 29.2322494];

	useEffect(() => {
		const l = Number(user?.latitude ?? 0);
		const lg = Number(user?.longitude ?? 0);

		if (lat && long) {
			const latitude = Number(lat);
			const longitude = Number(long);

			if (!isNaN(l) && !isNaN(lg)) {
				setMapPosition([l, lg]);
			} else {
				console.error("Invalid latitude or longitude values");
			}

			if (!isNaN(latitude) && !isNaN(longitude)) {
				setMapUserPosition([latitude, longitude]);
			} else {
				console.error("Invalid latitude or longitude values");
			}
		}
	}, [lat, long, user?.latitude, user?.longitude]);

	return (
		<ContentAdmin>
			<ToastContainer />
			{mapUserPosition && (
				<MapContainer
					center={mapPosition || defaultCenter}
					zoom={12}
					style={{ height: "89vh", width: "100%" }}
				>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>
					<Marker position={mapPosition} icon={hospitalIcon}>
						<Popup>
							<span className="text-center">
								Vous êtes ici. <br />
							</span>
							<b className="my-2 font-bold">{user?.pseudo}</b>
							<br />
						</Popup>
					</Marker>
					<Circle
						center={mapPosition}
						radius={3000}
						color="blue"
						fillColor="blue"
						fillOpacity={0.3}
					/>

					<Marker key={1} position={mapUserPosition}>
						<Popup>Utilisateur</Popup>
					</Marker>
					{mapPosition && mapUserPosition && (
						<RoutingMachine
							position={mapPosition}
							positionUser={mapUserPosition}
						/>
					)}
				</MapContainer>
			)}
		</ContentAdmin>
	);
};

export default LocatePatient;
