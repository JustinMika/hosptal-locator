import axios from "axios";
import ContentAdmin from "../components/ContentAdmin.tsx";
import VisitsPerMonthChart from "../../admin/stats/VisitsPerMonthChart.tsx";
import UserStatsChart from "../../admin/stats/UserStatsChart.tsx";
import AlertMois from "../../admin/stats/Hospital/AlertMois.tsx";

const DashboardHospital = () => {
	axios.defaults.withCredentials = true;
	localStorage.setItem("page", "Page d'accueil");
	window.document.title = "Page d'accueil";

	return (
		<ContentAdmin>
			<div className="">
				<div className="">
					<div className="grid grid-cols-2 gap-4 space-y-4">
						<div className="w-full h-auto p-4 bg-white rounded-lg shadow-md col-span-12 my-4">
							<h2 className="text-xl font-semibold mb-4">
								Évolution des alertes par mois
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
								Visites du site par mois
							</h2>
							{/* graphique */}
							<VisitsPerMonthChart />
						</div>
					</div>
				</div>
			</div>
		</ContentAdmin>
	);
};

export default DashboardHospital;
