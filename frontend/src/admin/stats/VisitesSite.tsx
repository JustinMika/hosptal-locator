const VisitesSite = () => {
	return (
		<div className="">
			<h2 className="text-xl font-semibold mb-4">
				Visites du site par jour
			</h2>
			<div className="grid grid-cols-2 gap-4">
				<div className="w-full h-64 p-4 bg-white rounded-lg shadow-md col-span-6">
					{/* graphique */}
				</div>
				<div className="w-full h-64 p-4 bg-white rounded-lg shadow-md col-span-6">
					<h2 className="text-xl font-semibold mb-4">
						visites du site par mois
					</h2>
					{/* graphique */}
				</div>
				<div className="w-full h-[20rem] p-4 bg-white rounded-lg shadow-md col-span-12">
					<h2 className="text-xl font-semibold mb-4">
						visites du site par mois - par page visistées
					</h2>
					{/* graphique */}
				</div>
			</div>
		</div>
	);
};

export default VisitesSite;
