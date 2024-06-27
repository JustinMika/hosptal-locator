"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AsideDashboard from "../components/AsideDashboard.tsx";
import ContentDashBoardUser from "../components/ContentDashBoardUser.tsx";
import Header from "../components/Header.tsx";
import getMainUrlApi from "../../utils/getMainUrlApi.ts";

const DashboardUsers = () => {
	window.document.title = "Dashboard";
	const [isUserConnected, setIsUserConnected] = useState<string>("");
	const navigate = useNavigate();
	useEffect(() => {
		async function fetchProtectedData() {
			try {
				axios
					.get(`${getMainUrlApi()}/api/v1/auth/check-login`, {
						withCredentials: true,
					})
					.then((e) => {
						setIsUserConnected("true");
						// eslint-disable-next-line prefer-const
						let usersInfo = {
							id: e.data.res.userId.id,
							uuid2: e.data.res.userId.access_id,
							name: e.data.res.userId.name,
							email: e.data.res.userId.email,
							profil: e.data.res.userId.profil,
							uuid: e.data.res.userId.uuid,
						};
						localStorage.setItem(
							"users",
							JSON.stringify(usersInfo)
						);
						localStorage.setItem(
							"isUserConnected",
							isUserConnected
						);

						if (
							localStorage.getItem("isUserConnected") === "false"
						) {
							navigate("/");
						}
					});
			} catch (error) {
				setIsUserConnected("false");
			}
		}
		fetchProtectedData();
	}, [isUserConnected, navigate]);
	localStorage.setItem("isUserCOnnected", "true");
	return (
		<>
			<Header />
			<AsideDashboard />
			<ContentDashBoardUser>
				<div className="grid grid-cols-3 gap-4 mb-4">
					<div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
						<p className="text-2xl text-gray-400 dark:text-gray-500">
							<svg
								className="w-3.5 h-3.5"
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
					</div>
					<div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
						<p className="text-2xl text-gray-400 dark:text-gray-500">
							<svg
								className="w-3.5 h-3.5"
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
					</div>
					<div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
						<p className="text-2xl text-gray-400 dark:text-gray-500">
							<svg
								className="w-3.5 h-3.5"
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
					</div>
				</div>
			</ContentDashBoardUser>
		</>
	);
};

export default DashboardUsers;
