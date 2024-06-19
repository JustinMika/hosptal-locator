import { Link, useNavigate } from "react-router-dom";
const BreadCrumb = () => {
	const Navigate = useNavigate();
	const handleAddTransaction = () => {
		Navigate(`/admin/add-hospitals/`);
	};
	return (
		<div className="sm:flex sm:justify-between sm:items-center mb-8 border-1 border-b pb-1 shadow-transparent">
			<nav className="flex" aria-label="Breadcrumb">
				<ol className="inline-flex items-center space-x-1 md:space-x-3">
					<li className="inline-flex items-center">
						<Link
							to={``}
							className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
						>
							<svg
								className="w-3 h-3 mr-2.5"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
							</svg>
							Home
						</Link>
					</li>
					<li aria-current="page">
						<div className="flex items-center">
							<svg
								className="w-3 h-3 text-gray-400 mx-1"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 6 10"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 9 4-4-4-4"
								/>
							</svg>
							<span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
								{localStorage.getItem("page")}
							</span>
						</div>
					</li>
				</ol>
			</nav>

			{/* Right: Actions */}
			<div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
				<button
					className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 duration-200 w-full flex items-baseline"
					onClick={handleAddTransaction}
				>
					<svg
						className="w-4 h-4 fill-current opacity-50 shrink-0"
						viewBox="0 0 16 16"
					>
						<path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
					</svg>
					<span className="xs:block ml-2">Ajout des hopitaux</span>
				</button>
			</div>
		</div>
	);
};

export default BreadCrumb;
