import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slice/authSlice";
import { useDispatch } from "react-redux";
import saveVisite from "../../utils/saveVisiteSite";

const Logout: React.FC = () => {
	window.document.title = "Logout";
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		return () => {
			saveVisite(window.document.title);
		};
	}, []);
	useEffect(() => {
		dispatch(logout());
		navigate("/");
	});
	return (
		<div className="flex justify-center w-full h-screen items-center">
			Logout
		</div>
	);
};

export default Logout;
