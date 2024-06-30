import AsideDashboard from "../components/AsideDashboard";
import ContentDashBoardUser from "../components/ContentDashBoardUser";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";
import MapComponent from "../hooks/MapComponent";

const UsersDashboard: React.FC = () => {
	return (
		<>
			<AsideDashboard />
			<ContentDashBoardUser>
				<Header />
				<div className="px-2 -mt-2">
					<div className="flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-md shadow-md h-[89vh] px-3">
						{/* {!hospitals && (
							<p className="text-2xl text-gray-400 dark:text-gray-500">
								<svg
									className="w-12 h-12 animate-spin"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 18 18"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M9 1v16M1 9h16"
									/>
								</svg>
							</p>
						)} */}

						<MapComponent />
					</div>
				</div>
				<ToastContainer
					position="bottom-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</ContentDashBoardUser>
		</>
	);
};

export default UsersDashboard;
