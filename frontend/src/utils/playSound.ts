// utils/playSound.js
export const playSound = (soundFile: string) => {
	const audio = new Audio(soundFile);
	audio.addEventListener("canplaythrough", () => {
		// the audio is now playable; play it if permissions allow
		audio.play();
	});
};
