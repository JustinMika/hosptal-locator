import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import fs from "fs";

export default defineConfig({
	server: {
		host: "0.0.0.0",
		https: {
			key: "./localhost-key.pem",
			cert: "./localhost-cert.pem",
		},
	},
	plugins: [react()],
});
