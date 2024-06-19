import axios from "axios";
import ContentAdmin from "./../components/ContentAdmin.tsx";
import VisitesSite from "../stats/VisitesSite.tsx";

const Dashboard = () => {
	axios.defaults.withCredentials = true;
	localStorage.setItem("page", "Dashboard");
	window.document.title = "Dashboard";

	return (
		<ContentAdmin>
			<div className="w-full">
				<VisitesSite />
			</div>
		</ContentAdmin>
	);
};

export default Dashboard;
