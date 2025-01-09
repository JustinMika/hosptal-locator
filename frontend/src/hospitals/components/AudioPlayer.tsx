import React, { useEffect } from "react";
import { Howl } from "howler";

const AudioPlayer: React.FC = () => {
	useEffect(() => {
		// Fonction pour démarrer l'audio
		const startAudio = () => {
			const sound = new Howl({
				src: ["/sounds/sirenAalert.wav"], // Chemin vers votre fichier audio
				autoplay: true, // Lecture automatique
				loop: false, // Pas de lecture en boucle
				volume: 0.9, // Volume de l'audio
			});

			// Nettoyer la ressource audio lorsque le composant est démonté
			return () => {
				sound.unload();
			};
		};

		// Utilisation d'une interaction simulée avec un clic pour démarrer l'audio
		const simulateUserInteraction = () => {
			const onClick = () => {
				startAudio();
				document.removeEventListener("click", onClick);
			};
			document.addEventListener("click", onClick);
		};

		// Appeler la fonction de simulation d'interaction utilisateur
		simulateUserInteraction();
	}, []);

	return <div>Audio en cours de lecture...</div>;
};

export default AudioPlayer;
