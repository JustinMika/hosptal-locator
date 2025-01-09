import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ContentAdmin from "../components/ContentAdmin";
import getMainUrlApi from "../../utils/getMainUrlApi.ts";
import axios from "axios";
import { UserProps } from "../../types.ts";

const ListHospital: React.FC = () => {
	window.document.title = "Liste des clients";
	axios.defaults.withCredentials = true;
	localStorage.setItem(
		"page",
		"Liste des hopitaux deja enregistre dans la base doonnees."
	);
	const [hospialList, sethospialList] = useState<UserProps[]>([]);

	const [searchTerm, setSearchTerm] = useState("");
	const [filteredUsers, setFilteredUsers] = useState<Array<UserProps>>([]);

	const [currentPage, setCurrentPage] = useState(1);
	const [usersPerPage, setusersPerPage] = useState<number>(10);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${getMainUrlApi()}hospitals/`
				);
				console.log(response.data);
				sethospialList(response.data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

	const deleteHospialList = (id: number | undefined | null) => {
		const updatedUsers = hospialList.filter((user) => user?.id !== id);
		sethospialList(updatedUsers);
		axios
			.delete(`${getMainUrlApi()}users/delete/${id}/`)
			.then((data) => {
				console.log(data);
				toast.info("success");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleSearch = () => {
		const filtered = hospialList.filter(
			(hospialList) =>
				hospialList?.pseudo
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				hospialList.email
					.toLowerCase()
					.includes(searchTerm.toLowerCase())
		);
		setFilteredUsers(filtered);
		setCurrentPage(1); // Réinitialiser la page actuelle lors d'une recherche
	};

	const handleResetSearch = () => {
		setSearchTerm("");
		// setFilteredUsers([]);
		setCurrentPage(1); // Réinitialiser la page actuelle après avoir supprimé la recherche
	};

	const indexOfLastUser = currentPage * usersPerPage;
	const indexOfFirstUser = indexOfLastUser - usersPerPage;
	const currentUsers = searchTerm
		? filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
		: hospialList.slice(indexOfFirstUser, indexOfLastUser);

	const totalUsers = searchTerm ? filteredUsers.length : hospialList.length;
	const totalPages = Math.ceil(totalUsers / usersPerPage);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
	return (
		<ContentAdmin>
			<ToastContainer />
			<div className="w-full">
				<div>
					<div className="flex mb-4">
						<input
							type="text"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder="Rechercher..."
							className="p-2 border border-gray-300 rounded-l w-full"
						/>
						<button
							onClick={handleSearch}
							className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 21l-4.35-4.35"
								/>
								<circle cx="10" cy="10" r="7" />
							</svg>
						</button>
						{searchTerm && (
							<button
								onClick={handleResetSearch}
								className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 ml-2"
							>
								Réinitialiser
							</button>
						)}
						<select
							name="perpage"
							id="perpage"
							className="p-2 border border-gray-300 rounded-r"
							onChange={() => setusersPerPage(1)}
						>
							<option value={5}>5</option>
							<option value={10}>10</option>
							<option value={15}>15</option>
							<option value={20}>20</option>
						</select>
					</div>
					{currentUsers && (
						<table className="w-full border-collapse shadow-md">
							<thead>
								<tr className="bg-gray-100 text-left uppercase">
									<th className="py-2 px-4 border">#ID</th>
									<th className="py-2 px-4 border">
										Nom de l'hopital
									</th>
									<th className="py-2 px-4 border">Email</th>
									<th className="py-2 px-4 border">
										Latitude
									</th>
									<th className="py-2 px-4 border">
										Longitude
									</th>
									<th className="py-2 px-4 border">
										Date de création
									</th>
									<th className="py-2 px-4 border">
										#Action
									</th>
								</tr>
							</thead>
							<tbody>
								{currentUsers.map((hospialLists) => (
									<tr
										key={hospialLists?.id}
										className="hover:bg-gray-100 transition-colors"
									>
										<td className="py-2 px-4 border">
											{hospialLists?.id}
										</td>
										<td className="py-2 px-4 border">
											{hospialLists?.pseudo}
										</td>
										<td className="py-2 px-4 border">
											{hospialLists?.email}
										</td>

										<td className="py-2 px-4 border">
											{hospialLists.latitude ?? "-"}
										</td>

										<td className="py-2 px-4 border">
											{hospialLists.longitude ?? "-"}
										</td>
										<td className="py-2 px-4 border p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
											{new Date(
												hospialLists.createdAt
											).toLocaleString()}
										</td>
										<td className="py-2 px-4 border flex flex-row gap-4">
											<button
												className="rounded-md bg-red-500 hover:bg-red-700 text-white px-2 py-2 shadow"
												onClick={() => {
													deleteHospialList(
														hospialLists.id
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
					)}
					{!currentUsers ?? (
						<p className="text-center text-xl">Aucun utulisateur</p>
					)}
					<div className="mt-4 flex justify-center">
						{Array.from({ length: totalPages }).map((_, index) => (
							<button
								key={index}
								onClick={() => paginate(index + 1)}
								className={`px-3 py-1 rounded ${
									currentPage === index + 1
										? "bg-blue-500 text-white"
										: "bg-white text-blue-500"
								}`}
							>
								{index + 1}
							</button>
						))}
					</div>
				</div>
			</div>
		</ContentAdmin>
	);
};

export default ListHospital;
