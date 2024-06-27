import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: true, // Écouter sur toutes les interfaces réseau
		port: 5173, // Spécifiez le port que vous souhaitez utiliser (par exemple, 3000)
	},
});
