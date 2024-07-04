import UserStatsChart from "./UserStatsChart";
import VisisteParPage from "./VisisteParPage";
import VisitsPerMonthChart from "./VisitsPerMonthChart";

const VisitesSite = () => {
	return (
		<div className="">
			<div className="grid grid-cols-1 gap-4">
				<div className="w-full h-[380px] p-4 bg-white rounded-lg shadow-md">
					<h2 className="text-xl font-semibold mb-4">Alertes</h2>
					{/* graphique */}
					<UserStatsChart />
				</div>
				<div className="w-full h-[380px] p-4 bg-white rounded-lg shadow-md">
					<h2 className="text-xl font-semibold mb-4">
						visites du site par mois
					</h2>
					{/* graphique */}
					<VisitsPerMonthChart />
				</div>
				<div className="w-full h-auto p-4 bg-white rounded-lg shadow-md">
					<h2 className="text-xl font-semibold mb-4">
						visites du site par mois - par page visistées
					</h2>
					{/* graphique */}
					<VisisteParPage />
				</div>
			</div>
		</div>
	);
};

export default VisitesSite;
