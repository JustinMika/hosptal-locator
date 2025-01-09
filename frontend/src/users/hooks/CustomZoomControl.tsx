import React from "react";
import { Hospital } from "../../types";
import { useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import axios from "axios";
import getMainUrlApi from "../../utils/getMainUrlApi";
import { toast } from "react-toastify";

const CustomZoomControl: React.FC<{
	nearestHospital: Hospital | undefined;
	positionUser: [number, number] | undefined;
}> = ({ nearestHospital, positionUser }) => {
	const user = useSelector((state: RootState) => state.user);
	const map = useMap();

	const zoomIn = () => {
		map.setZoom(map.getZoom() + 1);
	};

	const zoomOut = () => {
		map.setZoom(map.getZoom() - 1);
	};

	const Alerter = async () => {
		const data = {
			myId: user?.id,
			myLat: positionUser?.[0],
			myLog: positionUser?.[1],
			latH: nearestHospital?.latitude,
			lohH: nearestHospital?.longitude,
			idH: nearestHospital?.id,
		};
		await axios
			.post(`${getMainUrlApi()}alerts/`, data)
			.then((res) => {
				toast.success("Alerte envoyée avec succès.");
				console.log(res);
			})
			.catch((err) => {
				toast.error(
					"Une erreur s’est produite lors de l’envoi de votre alerte."
				);
				console.log(err);
			});
	};

	return (
		<div
			className="zoom-controls flex justify-between items-center gap-5"
			style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}
		>
			{nearestHospital && (
				<button
					className="flex flex-row justify-center items-center w-24 bg-red-600 p-2 gap-2 rounded-full"
					onClick={() => {
						Alerter();
					}}
				>
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
			)}

			<button
				onClick={zoomIn}
				className="flex flex-row justify-center items-center w-32 bg-green-600 p-2 gap-2 rounded-full"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-6 text-white"
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
				className="flex flex-row justify-center items-center w-32 bg-green-600 p-2 gap-2 rounded-full"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6 items-center text-white"
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

export default CustomZoomControl;
