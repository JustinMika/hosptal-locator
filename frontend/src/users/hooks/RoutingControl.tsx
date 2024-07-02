import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import { L } from "leaflet";
import { Position } from "../../types";

const RoutingControl: React.FC<{
	from: Position;
	to: Position;
}> = ({ from, to }) => {
	const map = useMap();

	useEffect(() => {
		const routingControl = L.Routing.control({
			waypoints: [
				L.latLng(from.latitude, from.longitude),
				L.latLng(to.latitude, to.longitude),
			],
			lineOptions: {
				styles: [{ color: "blue", weight: 4 }],
			},
			createMarker: () => null,
			show: false,
			addWaypoints: false,
		}).addTo(map);

		return () => {
			map.removeControl(routingControl);
		};
	}, [from, to, map]);

	return null;
};

export default RoutingControl;
