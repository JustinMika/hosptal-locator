import React, { useEffect, useState } from "react";
import ContentAdmin from "../components/ContentAdmin";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import getMainUrlApi from "../../utils/getMainUrlApi";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import saveVisite from "../../utils/saveVisiteSite";

interface User {
	id?: number;
	pseudo?: string;
	email?: string;
	telephone?: string;
	password?: string;
	latitude?: string | null;
	longitude?: string | null;
	userType?: string;
	createdAt?: string;
	updatedAt?: string;
}

interface Alerte {
	id?: number;
	userId?: number;
	userIdHostpital?: number;
	message?: string;
	status: "pending" | "finish" | "unknown" | "pendung";
	latitude?: string;
	longitude?: string;
	createdAt?: string;
	updatedAt?: string;
	user?: User;
}

const ALertesHospital: React.FC = () => {
	axios.defaults.withCredentials = true;
	localStorage.setItem("page", "Alerte des utilisateurs");
	window.document.title = "Alerte des utilisateurs";
	const user = useSelector((state: RootState) => state.user);

	const [alert, setalert] = useState<Array<Alerte>>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [alertPerPage] = useState<number>(5);

	useEffect(() => {
		const getData = async () => {
			await axios
				.get(`${getMainUrlApi()}alerts/all-my-alertes/${user?.id}`)
				.then((data) => {
					console.log(data.data);
					setalert(data.data);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		getData();
	}, [user?.id]);

	// Filtrer les utilisateurs en fonction de la recherche
	const filteredalert = alert?.filter(
		(user) =>
			user?.user?.pseudo
				?.toLowerCase()
				.includes(searchQuery?.toLowerCase()) ||
			user?.message?.toLowerCase().includes(searchQuery?.toLowerCase())
	);

	// Pagination
	const indexOfLastUser = currentPage * alertPerPage;
	const indexOfFirstUser = indexOfLastUser - alertPerPage;
	const currentalert = filteredalert.slice(indexOfFirstUser, indexOfLastUser);

	// Changer de page
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	const navigate = useNavigate();

	const localiserPatient = (
		lat: number | string | undefined,
		long: number | string | undefined
	) => {
		console.log(lat, long);
		const url = `/hospital/dashboard/localisation-patient/${lat}/${long}`;
		navigate(url);
	};

	useEffect(() => {
		return () => {
			saveVisite(window.document.title);
		};
	}, []);

	useEffect(() => {
		// Exécuter saveVisite uniquement lorsque le composant est monté
		saveVisite(window.document.title);
	}, []); // Dépendances vides, exécute seulement lors du montage
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

				<div className="flex flex-col px-0">
					<div className="overflow-x-auto px-2">
						<div className="inline-block min-w-full align-middle">
							<div className="overflow-hidden shadow">
								<table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
									<thead className="bg-gray-100 dark:bg-gray-700">
										<tr>
											<th className="p-4 text-xs font-medium text-left text-gray-500 text-wrap uppercase dark:text-gray-400">
												Noms du patient
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
											<th className="p-4 text-xs font-medium text-left text-gray-500 text-wrap uppercase dark:text-gray-400">
												Temps
											</th>
											<th className="p-4 text-xs font-medium text-left text-gray-500 text-wrap uppercase dark:text-gray-400">
												<a href="#">#Action</a>
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
													{user?.user?.pseudo}
												</td>
												<td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
													{user?.message}
												</td>
												<td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
													{user?.status ===
														"pending" ??
														"En attente"}
													{user?.status === "pendung"
														? "En attente"
														: "Terminer"}
												</td>
												<td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
													{new Date(
														user?.createdAt ??
															new Date()
													).toLocaleString()}
												</td>
												<td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
													{moment(
														user?.createdAt
													).fromNow()}
												</td>
												<td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white flex justify-center items-center gap-2">
													{user?.status ===
													"pending" ? (
														<button
															className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 duration-200 w-fit flex items-baseline"
															title="Marquer comme terminer."
															onClick={() => {}}
															disabled={true}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={
																	1.5
																}
																stroke="currentColor"
																className="size-6"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	d="m4.5 12.75 6 6 9-13.5"
																/>
															</svg>
														</button>
													) : (
														<button
															className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 duration-200 w-fit flex items-baseline"
															title="Marquer comme terminer."
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={
																	1.5
																}
																stroke="currentColor"
																className="size-6"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	d="m4.5 12.75 6 6 9-13.5"
																/>
															</svg>
														</button>
													)}

													<button
														className="px-4 py-2 bg-green-400 text-white rounded-md hover:bg-green-700 duration-200 w-fit flex justify-center items-center"
														title="Localiser le patient"
														onClick={() => {
															localiserPatient(
																user.latitude,
																user?.longitude
															);
														}}
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={1.5}
															stroke="currentColor"
															className="size-6"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
															/>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
															/>
														</svg>
														<span>Localiser</span>
													</button>
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

export default ALertesHospital;
