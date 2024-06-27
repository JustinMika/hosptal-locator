import React, { useEffect, useState } from "react";
import ContentAdmin from "../components/ContentAdmin";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import getMainUrlApi from "../../utils/getMainUrlApi";
import { Alerte as AlerteModel } from "../../types";

const Alerte: React.FC = () => {
	axios.defaults.withCredentials = true;
	localStorage.setItem("page", "Alerte des utilisateurs");
	window.document.title = "Alerte des utilisateurs";

	const [alert, setalert] = useState<Array<AlerteModel>>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [alertPerPage] = useState(5);

	useEffect(() => {
		axios
			.get(`${getMainUrlApi()}alert/`)
			.then((data) => {
				console.log(data.data);
				setalert(data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// Filtrer les utilisateurs en fonction de la recherche
	const filteredalert = alert?.filter(
		(user) =>
			user?.pseudo?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
			user?.message?.toLowerCase().includes(searchQuery?.toLowerCase())
	);

	// Pagination
	const indexOfLastUser = currentPage * alertPerPage;
	const indexOfFirstUser = indexOfLastUser - alertPerPage;
	const currentalert = filteredalert.slice(indexOfFirstUser, indexOfLastUser);

	// Changer de page
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	return (
		<ContentAdmin>
			<ToastContainer />
			<main>
				<div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
					<div className="w-full">
						<div className="sm:flex">
							<div className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
								<div className="lg:pr-3">
									<label
										htmlFor="alert-search"
										className="sr-only"
									>
										Search
									</label>
									<div className="relative mt-1 lg:w-64 xl:w-96">
										<input
											onChange={(e) => {
												setSearchQuery(e.target.value);
											}}
											type="text"
											name="email"
											id="alert-search"
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="Search ..."
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/*  */}
				<div className="flex flex-col px-0">
					<div className="overflow-x-auto px-2">
						<div className="inline-block min-w-full align-middle">
							<div className="overflow-hidden shadow">
								<table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
									<thead className="bg-gray-100 dark:bg-gray-700">
										<tr>
											<th className="p-4 text-xs font-medium text-left text-gray-500 text-wrap uppercase dark:text-gray-400">
												Pseudo|Nom
											</th>
											<th className="p-4 text-xs font-medium text-left text-gray-500 text-wrap uppercase dark:text-gray-400">
												Message
											</th>
											<th className="p-4 text-xs font-medium text-left text-gray-500 text-wrapuppercase dark:text-gray-400">
												Status
											</th>
											<th className="p-4 text-xs font-medium text-left text-gray-500 text-wrap uppercase dark:text-gray-400">
												Date de création
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
										{currentalert.map((user) => (
											<tr
												key={user?.id}
												className="hover:bg-gray-50 dark:hover:bg-gray-700 py-2"
											>
												<td className="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap">
													{user?.pseudo}
												</td>
												<td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
													{user?.message}
												</td>
												<td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
													{`-`}
												</td>
												<td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
													{user?.STATUS}
												</td>
												<td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
													{new Date(
														user.createdAt
													).toLocaleString()}
												</td>
											</tr>
										))}
									</tbody>
								</table>
								<div className="mt-4">
									<nav className="flex justify-center">
										<ul className="flex items-center">
											{Array.from(
												{
													length: Math.ceil(
														filteredalert.length /
															alertPerPage
													),
												},
												(_, index) => (
													<li key={index}>
														<button
															className={`px-3 py-1 mx-1 rounded-full focus:outline-none ${
																currentPage ===
																index + 1
																	? "bg-gray-300"
																	: "bg-gray-100"
															}`}
															onClick={() =>
																paginate(
																	index + 1
																)
															}
														>
															{index + 1}
														</button>
													</li>
												)
											)}
										</ul>
									</nav>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/*  */}
			</main>
		</ContentAdmin>
	);
};

export default Alerte;
