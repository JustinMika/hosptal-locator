/* eslint-disable no-unused-vars */
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContentAdmin from "../components/ContentAdmin";
import { FormEvent, useState } from "react";
import getMainUrlApi from "../../utils/getMainUrlApi";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const HospitalProfil = () => {
	axios.defaults.withCredentials = true;
	localStorage.setItem("page", "profil");

	window.document.title = "Profil";
	const user = useSelector((state: RootState) => state.user);

	window.document.title = "Profil utilisateur";
	const [Email, setEmail] = useState<string | undefined>(user?.email);
	const [Name, setName] = useState<string | undefined>(user?.pseudo);
	const [Phone, setPhone] = useState<string>("+243 000 000 000");
	axios.defaults.withCredentials = true;

	const [pwd, setPwd] = useState("");
	const [pwd2, setPwd2] = useState("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const data = {
			name: Name,
			email: Email,
			numero: Phone,
		};
		axios
			.put(`${getMainUrlApi()}/update-user-infos/`, data)
			.then((data) => {
				toast.info(`${data.data.message}🫡`, {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
				window.location.reload();
			})
			.catch((err) => {
				toast.error(`Erreur : ${err?.response?.data?.message}🫡`, {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			});
	};

	// update le  mot de passe
	const handleChangePasswordSubmit = (e: FormEvent) => {
		e.preventDefault();
		const data = {
			pwd: pwd,
			pwd2: pwd2,
		};
		// console.log(data)
		if (pwd == pwd2) {
			axios
				.put(`${getMainUrlApi()}/update-user-infos-password/`, data)
				.then((data) => {
					toast.info(`${data.data.message}🫡`, {
						position: "top-right",
						autoClose: 2000,
						hideProgressBar: false,
						closeOnClick: false,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
					});
					window.location.reload();
				})
				.catch((err) => {
					toast.error(`Erreur : ${err?.response?.data?.message}🫡`, {
						position: "top-right",
						autoClose: 2000,
						hideProgressBar: false,
						closeOnClick: false,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
					});
				});
		} else {
			toast.error(`le s deux mot de passent ne correspodent pas.`, {
				position: "top-center",
				autoClose: 9000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	};
	return (
		<ContentAdmin>
			<ToastContainer />
			<div className="grid md:grid-cols-2 sm:grid-cols-1 gap-8">
				{/* informations */}
				<div className="p-3">
					<div className="rounded-sm border border-stroke bg-white shadow-default">
						<div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
							<h3 className="font-medium text-black dark:text-white">
								Informations Personelles
							</h3>
						</div>
						<div className="p-3">
							<form action="#" onSubmit={handleSubmit}>
								<div className="mb-3 flex flex-col gap-5 sm:flex-row">
									<div className="w-full sm:w-1/2">
										<label
											className="mb-3 block text-sm font-medium text-black dark:text-white"
											htmlFor="fullName"
										>
											Pseudo
										</label>
										<div className="relative">
											<span className="absolute left-1 top-1">
												<svg
													className="fill-current"
													width="20"
													height="20"
													viewBox="0 0 20 20"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<g opacity="0.8">
														<path
															fillRule="evenodd"
															clipRule="evenodd"
															d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
															fill=""
														/>
														<path
															fillRule="evenodd"
															clipRule="evenodd"
															d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
															fill=""
														/>
													</g>
												</svg>
											</span>
											<input
												className="w-full rounded border border-stroke bg-gray py-1 pl-7 pr-8 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:text-white dark:focus:border-primary"
												type="text"
												name="fullName"
												id="fullName"
												placeholder={``}
												value={Name ?? "-"}
												onChange={(e) => {
													setName(e.target.value);
												}}
											/>
										</div>
									</div>

									<div className="w-full sm:w-1/2">
										<label
											className="mb-3 block text-sm font-medium text-black dark:text-white"
											htmlFor="phoneNumber"
										>
											Telephone
										</label>
										<input
											className="w-full rounded border border-stroke bg-gray py-1 px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
											type="text"
											name="phoneNumber"
											id="phoneNumber"
											placeholder={``}
											value={Phone ?? "-"}
											onChange={(e) => {
												setPhone(e.target.value);
											}}
										/>
									</div>
								</div>

								<div className="mb-3">
									<label
										className="mb-3 block text-sm font-medium text-black dark:text-white"
										htmlFor="emailAddress"
									>
										Email Address
									</label>
									<div className="relative">
										<span className="absolute left-2 top-1">
											<svg
												className="fill-current"
												width="20"
												height="20"
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g opacity="0.8">
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
														fill=""
													/>
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
														fill=""
													/>
												</g>
											</svg>
										</span>
										<input
											className="w-full rounded border border-stroke bg-gray py-1 pl-8 pr-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
											type="email"
											name="emailAddress"
											id="emailAddress"
											placeholder={``}
											value={Email ?? "-"}
											onChange={(e) => {
												setEmail(e.target.value);
											}}
										/>
									</div>
								</div>
								<div className="flex justify-end gap-2">
									<button
										className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
										type="submit"
									>
										Cancel
									</button>
									<button
										className="flex justify-center rounded bg-sky-600 hover:bg-sky-800 py-2 px-6 font-medium text-white hover:shadow-sm"
										type="submit"
									>
										Mettre à jour
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>

				{/* mot de passe */}
				<div className="p-3">
					<div className="rounded-sm border border-stroke bg-white shadow-default">
						<div className="border-b border-stroke px-2 py-2 dark:border-strokedark">
							<h3 className="font-medium text-black dark:text-white">
								Gestion de mot de passe
							</h3>
						</div>
						<div className="p-3">
							<form
								action="#"
								onSubmit={handleChangePasswordSubmit}
							>
								<div className="mb-3 flex flex-col gap-5 sm:flex-row">
									<div className="w-full sm:w-1/2">
										<label
											className="mb-3 block text-sm font-medium text-black dark:text-white"
											htmlFor="fullName"
										>
											Mot de passe
										</label>
										<div className="relative">
											<input
												className="w-full rounded border border-stroke bg-gray py-1 px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:text-white dark:focus:border-primary"
												type="password"
												name="pwd"
												id="pwd"
												placeholder="Mot de passe"
												value={pwd}
												onChange={(e) => {
													setPwd(e.target.value);
												}}
											/>
										</div>
									</div>

									<div className="w-full sm:w-1/2">
										<label
											className="mb-3 block text-sm font-medium text-black dark:text-white"
											htmlFor="pwd2"
										>
											confirmer le mot de passe
										</label>
										<input
											className="w-full rounded border border-stroke bg-gray py-1 px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
											type="password"
											name="pwd2"
											id="pwd2"
											placeholder="confirmer le mot de passe"
											value={pwd2}
											onChange={(e) => {
												setPwd2(e.target.value);
											}}
										/>
									</div>
								</div>
								<div className="flex justify-end gap-2">
									<button
										className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
										type="reset"
									>
										Cancel
									</button>
									<button
										className="flex justify-center rounded bg-sky-600 hover:bg-sky-800 py-2 px-6 font-medium text-white hover:shadow-sm"
										type="submit"
									>
										Changer le mot de passe
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</ContentAdmin>
	);
};

export default HospitalProfil;
