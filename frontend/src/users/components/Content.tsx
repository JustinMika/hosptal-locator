import React, { ReactNode } from "react";

interface ContentProps {
	children: ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => (
	<div className="w-full h-fit md:h-[85vh] sm:h-screen xs:h-screen -overflow-y-scroll flex justify-between items-center flex-col">
		<div className="">{children}</div>
	</div>
);

export default Content;
