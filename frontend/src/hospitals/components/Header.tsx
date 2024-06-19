import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import getMainUrlApi from "../../utils/getMainUrlApi";
import { useState } from "react";

import { setIsMenu } from "../../redux/isMenuSlice";
import { useDispatch } from "react-redux";

const Header = () => {
	const dispatch = useDispatch();
	const selector = useSelector((state) => state.loginAdminSlice);
	const [isMenuUserOpen, setisMenuUserOpen] = useState(false);
	const [isMenu, setisMenu] = useState(false);
	return (
		<nav className="fixed top-0 right-0 left-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
			<div className="px-3 py-3 lg:px-5 lg:pl-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center justify-start">
						<button
							type="button"
							className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							onClick={() => {
								setisMenu(!isMenu);
								dispatch(setIsMenu(!isMenu));
							}}
							// onBlur={() => {
							//     setisMenu(false)
							//     dispatch(setIsMenu(false))
							// }}
						>
							<span className="sr-only">Open sidebar</span>
							<svg
								className="w-6 h-6"
								aria-hidden="true"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									clipRule="evenodd"
									fillRule="evenodd"
									d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
								></path>
							</svg>
						</button>
						<Link
							to={`/${selector?.user?.uuid}`}
							className="flex md:mr-24"
						>
							<span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white uppercase">
								1000pharma
							</span>
						</Link>
					</div>
					<div className="flex items-center">
						<div className="flex items-center ml-3">
							<div className="flex items-center justify-between">
								<button
									type="button"
									className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
								>
									<span className="sr-only">
										View notifications
									</span>

									<svg
										className="w-6 h-6"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
									</svg>
								</button>

								<button
									type="button"
									className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
								>
									<svg
										className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
										></path>
									</svg>
								</button>

								<button
									type="button"
									className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
									onClick={() => {
										setisMenuUserOpen(!isMenuUserOpen);
									}}
									// onBlur={() => {
									//     setisMenuUserOpen(false)
									// }}
								>
									<span className="sr-only">
										Open user menu
									</span>
									{selector.user.profil ? (
										<img
											className="w-12 h-12 rounded-full"
											src={`${getMainUrlApi()}/${
												selector.user.profil
											}`}
										/>
									) : (
										<div className="relative border border-gray-300 inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-50 rounded-full">
											<span className="font-semibold text-xl text-blue-800 dark:text-gray-300 uppercase">
												{
													selector?.user?.name?.split(
														" "
													)[0][0]
												}
											</span>
										</div>
									)}
								</button>
							</div>
							<div
								className={
									isMenuUserOpen
										? `absolute right-2 top-11 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 mt-5`
										: `z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`
								}
							>
								<div className="px-4 py-3" role="none">
									<p
										className="text-sm text-gray-900 dark:text-white"
										role="none"
									>
										{selector.user.name ?? "unknown user"}
									</p>
									<p
										className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
										role="none"
									>
										{selector.user.email}
									</p>
								</div>
								<ul className="py-1" role="none">
									<li>
										<Link
											to={`/${selector?.user?.uuid}`}
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
											role="menuitem"
										>
											Dashboard
										</Link>
									</li>
									<li>
										<Link
											to={`/1000pharma_admin_/Profil/${selector?.user?.uuid}`}
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
											role="menuitem"
										>
											Settings
										</Link>
									</li>
									<li>
										<Link
											to={`/1000pharma_admin_/logout/${selector?.user?.uuid}`}
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
											role="menuitem"
										>
											Sign out
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Header;
