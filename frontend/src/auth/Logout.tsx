import axios from "axios";
import { useDispatch } from "react-redux";
// import { useNavigate } from 'react-router-dom'
import getUrlApi from "../utils/getUrlApi";
import { removeData } from "../redux/loginAdminSlice";
import ContentAdmin from "../partials/ContentAdmin";
import { useNavigate } from "react-router-dom";

const Logout = () => {
	axios.defaults.withCredentials = true;
	const dispatch = useDispatch();
	// const navigate = useNavigate()
	window.document.title = "logout";
	dispatch(removeData());
	const navigate = useNavigate();
	localStorage.removeItem("milles_pharma_Slice_loginAdminSlice");
	try {
		localStorage.removeItem("page");
		localStorage.removeItem("token");
		localStorage.removeItem("persist:milles_pharma_Slice_loginAdminSlice");
		localStorage.removeItem("uuid");
		axios
			.get(`${getUrlApi()}/logout/`)
			.then(() => {
				dispatch(removeData());
				localStorage.removeItem("page");
				localStorage.removeItem("token");
				localStorage.removeItem(
					"persist:milles_pharma_Slice_loginAdminSlice"
				);
				localStorage.removeItem("uuid");
				navigate("/1000pharma_admin_/auth/signin/");
			})
			.catch(() => {
				dispatch(removeData());
				localStorage.removeItem("page");
				localStorage.removeItem("token");
				localStorage.removeItem(
					"persist:milles_pharma_Slice_loginAdminSlice"
				);
				localStorage.removeItem("uuid");
				navigate("/1000pharma_admin_/auth/signin/");
			});
	} catch (error) {
		dispatch(removeData());
		localStorage.removeItem("page");
		localStorage.removeItem("token");
		localStorage.removeItem("persist:milles_pharma_Slice_loginAdminSlice");
		localStorage.removeItem("uuid");
		navigate("/1000pharma_admin_/auth/signin/");
	}
	return (
		<ContentAdmin>
			<div className="bg-slate-50 flex justify-center items-center h-screen w-full overflow-hidden">
				<p className="text-5xl text-gray-700 uppercase">Logout</p>
			</div>
		</ContentAdmin>
	);
};

export default Logout;
