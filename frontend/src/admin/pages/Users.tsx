import React, { FormEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ContentAdmin from "../components/ContentAdmin";
import getMainUrlApi from "../../utils/getMainUrlApi.ts";
import axios from "axios";
import { UserProps } from "../../types.ts";

const Users: React.FC = () => {
	const [users, setUsers] = useState<Array<UserProps>>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [usersPerPage] = useState(9);

	axios.defaults.withCredentials = true;
	localStorage.setItem("page", "Liste des utilisateurs");
	const [openModal, setopenModal] = useState(false);
	const isModalOpen = `fixed left-0 right-0 z-50 items-center justify-center overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full flex backdrop-brightness-90  backdrop-blur-sm`;
	const isModalClose = `fixed left-0 right-0 z-50 items-center justify-center overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full hidden backdrop-brightness-120`;

	useEffect(() => {
		axios
			.get(`${getMainUrlApi()}users/`)
			.then((data) => {
				console.log(data.data);
				setUsers(data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// Filtrer les utilisateurs en fonction de la recherche
	const filteredUsers = users?.filter(
		(user) =>
			user?.pseudo?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
			user?.email?.toLowerCase().includes(searchQuery?.toLowerCase())
	);

	// Pagination
	const indexOfLastUser = currentPage * usersPerPage;
	const indexOfFirstUser = indexOfLastUser - usersPerPage;
	const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

	// Changer de page
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	const deleteUser = (id: number | undefined | null) => {
		const updatedUsers = users.filter((user) => user?.id !== id);
		setUsers(updatedUsers);
		axios
			.delete(`${getMainUrlApi()}users/delete/${id}/`)
			.then((data) => {
				setUsers(data.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const [Pseudo, setPseudo] = useState<string>("");
	const [Email, setEmail] = useState<string>("");

	const handleAddUsers = (e: FormEvent) => {
		e.preventDefault();
		const data = {
			name: Pseudo,
			email: Email,
		};
		if (Pseudo && Email) {
			try {
				axios
					.post(`${getMainUrlApi()}users/create-admin-users/`, data)
					.then((data) => {
						setopenModal(!openModal);
						toast.info(`${data.data.message}🫡`, {
							position: "top-right",
							autoClose: 5000,
							hideProgressBar: true,
							closeOnClick: false,
							pauseOnHover: true,
							draggable: true,
							progress: 1,
							theme: "colored",
						});
						setPseudo("");
						setEmail("");
						window.location.reload();
					})
					.catch((err) => {
						console.log(err);
						toast.error(`Erreur : ${err?.message}🫡`, {
							position: "top-right",
							autoClose: 5000,
							hideProgressBar: true,
							closeOnClick: false,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: "light",
						});
					});
			} catch (e) {
				toast.error(`Erreur 🫡`, {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: true,
					closeOnClick: false,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			}
		} else {
			toast.error(`🫡 Veuillez remplir tous les champs svp.`, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: 1,
				theme: "colored",
			});
		}
	};

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
										htmlFor="users-search"
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
											id="users-search"
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="Search ..."
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="sticky bottom-0 right-0 items-center w-full pp-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700"></div>
				{/*  */}
				<div className="flex flex-col">
					<div className="overflow-x-auto">
						<div className="inline-block min-w-full align-middle">
							<div className="overflow-hidden shadow">
								<table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
									<thead className="bg-gray-100 dark:bg-gray-700">
										<tr className="uppercase">
											<th className="p-4 text-xs font-medium text-left text-gray-500 text-wrap uppercase dark:text-gray-400">
												Pseudo|Nom
											</th>
											<th className="p-4 text-xs font-medium text-left text-gray-500 text-wrap uppercase dark:text-gray-400">
												Email
											</th>
											<th className="p-4 text-xs font-medium text-left text-gray-500 text-wrap uppercase dark:text-gray-400">
												Telephone
											</th>
											<th className="p-4 text-xs font-medium text-left text-gray-500 text-wrapuppercase dark:text-gray-400">
												Latitude
											</th>
											<th className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
												Longitude
											</th>
											<th className="p-4 text-xs font-medium text-left text-gray-500 text-wrap uppercase dark:text-gray-400">
												Type
											</th>
											<th className="p-4 text-xs font-medium text-left text-gray-500 text-wrap uppercase dark:text-gray-400">
												Date de création
											</th>
											<th className="p-4 text-xs font-medium text-left text-gray-500 text-wrap uppercase dark:text-gray-400">
												#Action
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
										{currentUsers.map((user) => (
											<tr
												key={user?.id}
												className="hover:bg-gray-50 dark:hover:bg-gray-700 py-2"
											>
												<td className="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap">
													{user?.pseudo}
												</td>
												<td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
													{user?.email}
												</td>
												<td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
													{`-`}
												</td>
												<td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
													{user?.latitude ?? "-"}
												</td>
												<td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
													{user?.longitude ?? "-"}
												</td>
												<td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
													{user?.userType ?? "-"}
												</td>
												<td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
													{new Date(
														user.createdAt
													).toLocaleString()}
												</td>
												<td>
													<button
														className="rounded-md bg-red-500 hover:bg-red-700 text-white px-2 py-2 shadow"
														onClick={() => {
															deleteUser(
																user?.id
															);
														}}
													>
														Supprimer
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
														filteredUsers.length /
															usersPerPage
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

			{/* modal */}
			<div className={openModal ? isModalOpen : isModalClose}>
				<div className="relative w-full h-full max-w-2xl px-4 md:h-auto z-50 transition-all ease-in-out">
					<div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
						<div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
							<h3 className="text-xl font-semibold dark:text-white">
								Ajout des utilisateurs
							</h3>
							<button
								onClick={() => {
									setopenModal(!openModal);
								}}
								type="button"
								className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
							>
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clipRule="evenodd"
									></path>
								</svg>
							</button>
						</div>
						<form action="#" onSubmit={handleAddUsers}>
							<div className="p-6 space-y-3">
								<div className="grid grid-cols-6 gap-3">
									<div className="col-span-6 sm:col-span-3">
										<label
											htmlFor="first-name"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Pseudo
										</label>
										<input
											type="text"
											name="first-name"
											id="first-name"
											className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="Bonnie"
											required={true}
											value={Pseudo}
											onChange={(e) => {
												setPseudo(e.target.value);
											}}
										/>
									</div>
									<div className="col-span-6 sm:col-span-3">
										<label
											htmlFor="email"
											className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
										>
											Email
										</label>
										<input
											type="email"
											name="email"
											id="email"
											className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="example@company.com"
											required={true}
											value={Email}
											onChange={(e) => {
												setEmail(e.target.value);
											}}
										/>
									</div>
								</div>
							</div>
							<div className="p-3 gap-3 border-t border-gray-200 rounded-b dark:border-gray-700 flex justify-end ">
								<button
									onClick={() => {
										setopenModal(!openModal);
									}}
									className="flex justify-end items-end text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
								>
									Fermer
								</button>
								<button
									className="flex justify-end items-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									type="submit"
								>
									Ajouter
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>

			{/* little modal */}
			<div
				className="fixed left-0 right-0 z-50 items-center justify-center hidden overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full"
				id="delete-user-modal"
			>
				<div className="relative w-full h-full max-w-md px-4 md:h-auto">
					<div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
						<div className="flex justify-end p-2">
							<button
								type="button"
								className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
								data-modal-toggle="delete-user-modal"
							>
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clipRule="evenodd"
									></path>
								</svg>
							</button>
						</div>
						<div className="p-6 pt-0 text-center">
							<svg
								className="w-16 h-16 mx-auto text-red-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								></path>
							</svg>
							<h3 className="mt-5 mb-6 text-lg text-gray-500 dark:text-gray-400">
								Are you sure you want to delete this user?
							</h3>
							<a
								href="#"
								className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 dark:focus:ring-red-800"
							>
								Yes, m sure
							</a>
							<a
								href="#"
								className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
								data-modal-toggle="delete-user-modal"
							>
								No, cancel
							</a>
						</div>
					</div>
				</div>
			</div>
		</ContentAdmin>
	);
};

export default Users;
