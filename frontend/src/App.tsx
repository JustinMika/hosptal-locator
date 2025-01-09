import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Dashboard from "./admin/pages/Dashboard.tsx";
import Login from "./auth/Login.tsx";
import PageNotFound from "./error/PageNotFound.tsx";
import CreateAccount from "./auth/CreateAccount.tsx";
import AddHosptal from "./admin/pages/AddHosptal.tsx";
import UsersMessages from "./users/pages/UsersMessages.tsx";
import Logout from "./users/pages/Logout.tsx";
import ListHospital from "./admin/pages/ListHospital.tsx";
import Users from "./admin/pages/Users.tsx";
import Statistique from "./admin/pages/Statistique.tsx";
import Alerte from "./admin/pages/Alerte.tsx";
import DashboardHospital from "./hospitals/pages/DashboardHospital.tsx";
import Messages from "./hospitals/pages/Messages.tsx";
import HospitalProfil from "./hospitals/pages/HospitalProfil.tsx";
import ALertesHospital from "./hospitals/pages/ALertesHospital.tsx";
import UsersDashboard from "./users/pages/UsersDashboard.tsx";
import UserProfile from "./users/pages/UserProfile.tsx";
import Profil from "./admin/pages/Profil.tsx";
import AddUser from "./admin/pages/AddUser.tsx";
import LocatePatient from "./hospitals/pages/LocatePatient.tsx";

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
					path="/admin/dashboard/statistiques"
					element={<Statistique />}
					errorElement={<PageNotFound />}
				/>
				<Route
					path="/admin/dashboard/gestion-des-utilisateurs/"
					element={<Users />}
					errorElement={<PageNotFound />}
				/>
				<Route
					path="/admin/dashboard/alerte"
					element={<Alerte />}
					errorElement={<PageNotFound />}
				/>

				<Route
					path="/admin/dashboard/hopitaux/ajout-hopitaux/"
					element={<AddHosptal />}
					errorElement={<PageNotFound />}
				/>
				<Route
					path="/admin/dashboard/hopitaux/listes-hopitaux"
					element={<ListHospital />}
					errorElement={<PageNotFound />}
				/>
				<Route
					path="/admin/dashboard/utilisateur/profil-utilisateur"
					element={<Profil />}
					errorElement={<PageNotFound />}
				/>
				<Route
					path="/admin/dashboard/utilisateurs/ajout-utilisateurs"
					element={<AddUser />}
					errorElement={<PageNotFound />}
				/>

				{/* END Admin routes */}

				{/* hospitals routes */}
				<Route
					path="/hospital/dashboard/"
					element={<DashboardHospital />}
					errorElement={<PageNotFound />}
				/>
				<Route
					path="/hospital/dashboard/alertes-users/"
					element={<ALertesHospital />}
					errorElement={<PageNotFound />}
				/>
				<Route
					path="/hospital/dashboard/messagerie/"
					element={<Messages />}
					errorElement={<PageNotFound />}
				/>
				<Route
					path="/hospital/dashboard/profil/"
					element={<HospitalProfil />}
					errorElement={<PageNotFound />}
				/>
				<Route
					path="/hospital/dashboard/localisation-patient/:lat/:long/"
					element={<LocatePatient />}
					errorElement={<PageNotFound />}
				/>
				{/* END hospitals routes */}

				{/* users routes  */}
				<Route
					path="/users/dashboard/"
					element={<UsersDashboard />}
					errorElement={<PageNotFound />}
				/>
				<Route
					path="/users/messagerie/:uuid"
					element={<UsersMessages />}
					errorElement={<PageNotFound />}
				/>
				<Route
					path="/users/profil/:uuid"
					element={<UserProfile />}
					errorElement={<PageNotFound />}
				/>

				{/* logout routes */}
				<Route
					path="/admin/dashboard/logout"
					element={<Logout />}
					errorElement={<PageNotFound />}
				/>
				<Route
					path="/hospital/dashboard/logout"
					element={<Logout />}
					errorElement={<PageNotFound />}
				/>
				<Route
					path="/users/logout/:uuid"
					element={<Logout />}
					errorElement={<PageNotFound />}
				/>
				{/* End logout routes */}

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
