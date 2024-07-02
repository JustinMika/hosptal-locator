const getAccuracyMessage = (accuracy: number) => {
	if (accuracy <= 10) return "Précision élevée";
	if (accuracy <= 50) return "Précision moyenne";
	return "Précision faible";
};

export default getAccuracyMessage;
