import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Dashboard from "./admin/pages/Dashboard.tsx";
import Login from "./auth/Login.tsx";
import PageNotFound from "./error/PageNotFound.tsx";
import CreateAccount from "./auth/CreateAccount.tsx";
import DashboardHosptal from "./hospitals/pages/DashboardHosptal.tsx";
import AddHosptal from "./admin/pages/AddHosptal.tsx";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={<Login />}
					errorElement={<PageNotFound />}
				/>
				<Route
					path="create-acount"
					element={<CreateAccount />}
					errorElement={<PageNotFound />}
				/>

				{/* Admin routes */}
				<Route
					path="admin/dashboard/"
					element={<Dashboard />}
					errorElement={<PageNotFound />}
				/>

				<Route
					path="admin/add-hospitals"
					element={<AddHosptal />}
					errorElement={<PageNotFound />}
				/>

				{/* Hispital routes */}
				<Route
					path="hosptal/dashboard"
					element={<DashboardHosptal />}
					errorElement={<PageNotFound />}
				/>

				{/* users routes */}
				{/* <Route
					path="users/dashboard"
					element={<UsersDashboard />}
					errorElement={<PageNotFound />}
				/> */}

				{/* Not found route */}
				<Route
					path="*"
					element={<PageNotFound />}
					errorElement={<PageNotFound />}
				/>
			</Routes>
		</Router>
	);
};

export default App;
