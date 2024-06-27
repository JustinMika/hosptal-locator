/* eslint-disable @typescript-eslint/no-unused-vars */
import AsideDashboard from "../components/AsideDashboard";
import ContentDashBoardUser from "../components/ContentDashBoardUser";
import React from "react";

const UsersDashboard: React.FC = () => {
	return (
		<>
			<AsideDashboard />
			<ContentDashBoardUser>
				<div className="flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-md shadow-md h-[95vh]">
					<p className="text-2xl text-gray-400 dark:text-gray-500">
						<svg
							className="w-12 h-12 animate-spin"
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
			</ContentDashBoardUser>
		</>
	);
};

export default UsersDashboard;
