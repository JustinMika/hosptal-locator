/* eslint-disable no-mixed-spaces-and-tabs */
import { useState, useEffect } from "react";
import { Id, toast } from "react-toastify";

interface Position {
	latitude: number;
	longitude: number;
	accuracy: number;
}

const useGeolocation = () => {
	const [position, setPosition] = useState<Position | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [notificationId, setNotificationId] = useState<number | Id>();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const onSuccess = (position: GeolocationPosition) => {
		const { latitude, longitude, accuracy } = position.coords;
		setPosition({ latitude, longitude, accuracy });

		const message =
			accuracy > 50
				? "Précision Faible: " + accuracy.toFixed(2) + " mettres"
				: "Position mis à jour: " +
				  latitude +
				  ", " +
				  longitude +
				  " avec une précision de: " +
				  accuracy.toFixed(2) +
				  " mettre";

		if (notificationId) {
			toast.update(notificationId, {
				render: message,
				type: accuracy > 50 ? toast.TYPE.WARNING : toast.TYPE.SUCCESS,
				autoClose: false, // Ne ferme pas automatiquement la notification
			});
		} else {
			const newNotificationId = toast(message, {
				type: accuracy > 50 ? toast.TYPE.WARNING : toast.TYPE.SUCCESS,
				autoClose: false, // Ne ferme pas automatiquement la notification
			});
			setNotificationId(newNotificationId);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const onError = (error: GeolocationPositionError) => {
		setError(error.message);

		const errorMessage = `Error: Impossible d'obtenir la localisation`;

		if (notificationId) {
			toast.update(notificationId, {
				render: errorMessage,
				type: toast.TYPE.ERROR,
				autoClose: false, // Ne ferme pas automatiquement la notification
			});
		} else {
			const newNotificationId = toast.error(errorMessage, {
				autoClose: false, // Ne ferme pas automatiquement la notification
			});
			setNotificationId(newNotificationId);
		}
	};

	useEffect(() => {
		if (!navigator.geolocation) {
			setError(
				"La géolocalisation n'est pas prise en charge par votre navigateur"
			);
			const newNotificationId = toast.error(
				"La géolocalisation n'est pas prise en charge par votre navigateur",
				{
					autoClose: 1, // Ne ferme pas automatiquement la notification
				}
			);
			setNotificationId(newNotificationId);
			return;
		}

		const watcher = navigator.geolocation.watchPosition(
			onSuccess,
			onError,
			{
				enableHighAccuracy: true,
				timeout: 10000,
				maximumAge: 0,
			}
		);

		// Mise à jour périodique toutes les 5 secondes
		const interval = setInterval(() => {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					onSuccess(position);
				},
				(error) => {
					onError(error);
				},
				{
					enableHighAccuracy: true,
					timeout: 10000,
					maximumAge: 0,
				}
			);
		}, 5000);

		return () => {
			navigator.geolocation.clearWatch(watcher);
			clearInterval(interval);
			// toast.dismiss(notificationId); // Ferme la notification lorsque le composant est démonté
		};
	}, [notificationId, onError, onSuccess]);

	return { position, error };
};

export default useGeolocation;
