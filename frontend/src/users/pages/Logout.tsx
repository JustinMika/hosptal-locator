import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/");
	});
	return (
		<div className="flex justify-center w-full h-screen items-center">
			Logout
		</div>
	);
};

export default Logout;
