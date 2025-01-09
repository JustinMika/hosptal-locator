import getMainUrlApi from "./getMainUrlApi";
import axios from "axios";

const saveVisite = (page: string) => {
	if (page) {
		try {
			const data = {
				page: page ?? "-",
			};
			axios
				.post(`${getMainUrlApi()}visite-site`, data)
				.then(() => {})
				.catch(() => {});
		} catch (error) {
			/* empty */
		}
	}
};

export default saveVisite;
