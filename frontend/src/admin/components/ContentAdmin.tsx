import React, { ReactNode, useEffect } from "react";
import BreadCrumb from "./BreadCrumb.tsx";
import SideBar from "./SideBar.tsx";
import { logout } from "../../store/slice/authSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import { useNavigate } from "react-router-dom";

interface ContentProps {
	children: ReactNode;
}
const ContentAdmin: React.FC<ContentProps> = ({ children }) => {
	const navigator = useNavigate();
	const user = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		const logoutUser = () => {
			if (!user) {
				const link = `/admin/dashboard/logout`;
				alert("Veuillez vous connectez de nouveau,...");
				navigator(link);
				dispatch(logout());
			}
		};
		logoutUser();
	});
	return (
		<div>
			<SideBar />
			<div className="px-0 py-4 sm:ml-64 bg-gray-50 h-screen">
				<div className="px-4 py-4 mt-14">
					<BreadCrumb />
					{children}
				</div>
			</div>
		</div>
	);
};

export default ContentAdmin;
