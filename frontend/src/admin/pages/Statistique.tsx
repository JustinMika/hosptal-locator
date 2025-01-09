import axios from "axios";
import React from "react";
import ContentAdmin from "../components/ContentAdmin";
import UserStatsChart from "../stats/UserStatsChart";
import VisitsPerMonthChart from "../stats/VisitsPerMonthChart";
import VisisteParPage from "../stats/VisisteParPage";
import AlertMois from "../stats/Hospital/AlertMois";

const Statistique: React.FC = () => {
	axios.defaults.withCredentials = true;
	localStorage.setItem("page", "Statistiques");
	window.document.title = "Statistiques";
	return (
		<ContentAdmin>
			<div className="">
				<div className="grid grid-cols-2 gap-4">
					<div className="w-full h-[20rem] p-4 bg-white rounded-lg shadow-md col-span-12 my-4">
						<h2 className="text-xl font-semibold mb-4">
							Evolutions des alertes par mois
						</h2>
						{/* graphique */}
						<AlertMois />
					</div>

					<div className="w-full h-auto p-4 bg-white rounded-lg shadow-md">
						<h2 className="text-xl font-semibold mb-4">
							Visites du site par jour
						</h2>
						{/* graphique */}
						<UserStatsChart />
					</div>
					<div className="w-full h-auto p-4 bg-white rounded-lg shadow-md col-span-11">
						<h2 className="text-xl font-semibold mb-4">
							visites du site par mois
						</h2>
						{/* graphique */}
						<VisitsPerMonthChart />
					</div>
					<div className="w-full h-[20rem] p-4 bg-white rounded-lg shadow-md col-span-12">
						<h2 className="text-xl font-semibold mb-4">
							visites du site par mois - par page visistées
						</h2>
						{/* graphique */}
						<VisisteParPage />
					</div>
				</div>
			</div>
		</ContentAdmin>
	);
};

export default Statistique;
