import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slice/authSlice";
import { useDispatch } from "react-redux";

const Logout: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
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
