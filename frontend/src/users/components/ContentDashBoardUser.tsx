import React, { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slice/authSlice";

interface ContentProps {
	children: ReactNode;
}
const ContentDashBoardUser: React.FC<ContentProps> = ({ children }) => {
	const navigator = useNavigate();
	const user = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		if (!user) {
			const link = `/users/logout/${user ?? 0}`;
			alert("Veuillez vous connectez de nouveau,...");
			navigator(link);
			dispatch(logout());
		}
	});
	return (
		<>
			<div className="p-4_ sm:ml-64">
				<div className="p-0 border- rounded dark:border-gray-700 mt-0">
					{children}
				</div>
			</div>
		</>
	);
};

export default ContentDashBoardUser;
