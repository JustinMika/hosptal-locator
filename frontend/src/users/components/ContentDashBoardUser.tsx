import React, { ReactNode } from "react";

interface ContentProps {
	children: ReactNode;
}
const ContentDashBoardUser: React.FC<ContentProps> = ({ children }) => {
	return (
		<>
			<div className="p-4 sm:ml-64">
				<div className="p-0 border- rounded dark:border-gray-700 mt-0">
					{children}
				</div>
			</div>
		</>
	);
};

export default ContentDashBoardUser;
