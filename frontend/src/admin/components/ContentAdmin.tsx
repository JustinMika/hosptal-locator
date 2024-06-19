import BreadCrumb from "./BreadCrumb.tsx";
import SideBar from "./SideBar.tsx";

const ContentAdmin = ({ children }) => (
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

export default ContentAdmin;
