import axios from "axios";
import ContentAdmin from "../components/ContentAdmin.tsx";
import VisitesSite from "../stats/VisitesSite.tsx";

const DashboardHospital = () => {
	axios.defaults.withCredentials = true;
	localStorage.setItem("page", "Page d'accueil");
	window.document.title = "Page d'accueil";

	return (
		<ContentAdmin>
			<div className="">
				<VisitesSite />
			</div>
		</ContentAdmin>
	);
};

export default DashboardHospital;
