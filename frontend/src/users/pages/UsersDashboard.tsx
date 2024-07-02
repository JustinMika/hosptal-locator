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
