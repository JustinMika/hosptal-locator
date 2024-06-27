// src/components/Login.tsx
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import getMainUrlApi from "../utils/getMainUrlApi.ts";

interface Info {
	email: string;
	password: string;
}

const Login: React.FC = () => {
	const navigate = useNavigate();
	window.document.title = "Login";
	axios.defaults.withCredentials = true;
	const [isLeading2, setIsLeading2] = useState(false);

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email("Invalid email")
			.required("L'e-mail est requis"),
		password: Yup.string()
			.min(8, "Le mot de passe doit être d'au moins 8 caractères")
			.required("Un mot de passe est requis"),
	});

	const handleSubmit = async (
		values: Info,
		{ setSubmitting }: FormikHelpers<Info>
	) => {
		setIsLeading2(true);
		try {
			const response = await axios.post(
				`${getMainUrlApi()}auth/login`,
				values
			);
			// console.log(response?.data?.userType);
			const { token, userType } = response.data;

			if (token && userType) {
				axios.defaults.headers.common[
					"Authorization"
				] = `Bearer ${token}`;

				toast.info(`🫡 ${response.data.message}`, {
					position: "bottom-right",
					autoClose: 9000,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});

				document.cookie = `jwt=${token}; path=/`;
				setIsLeading2(false);

				if (userType === "user") {
					const url = `/users/dashboard`;
					navigate(url);
				} else if (userType === "hopital") {
					const url = `/hosptal/dashboard/`;
					navigate(url);
				} else if (userType === "admin") {
					const url = `/admin/dashboard/`;
					navigate(url);
				} else {
					toast.error(`Utilisateur inconu.`, {
						position: "top-right",
						autoClose: 9000,
						hideProgressBar: false,
						closeOnClick: false,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
					});
				}
			}
		} catch (error) {
			toast.error(`Erreur: Email et/ou mot de passe invalide.`, {
				position: "top-right",
				autoClose: 9000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			setIsLeading2(false);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="bg-gray-50 dark:bg-gray-900 flex items-center justify-center min-h-screen">
			<ToastContainer />
			<div className="w-full max-w-md p-6 bg-white rounded-lg dark:bg-gray-800 shadow-md">
				<h2 className="text-2xl font-bold text-gray-700 dark:text-white mb-6 text-center">
					Se connecter à la plate-forme
				</h2>
				<Formik
					initialValues={{ email: "", password: "" }}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					<Form className="space-y-6">
						<div>
							<label
								htmlFor="email"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Votre e-mail
							</label>
							<Field
								type="email"
								name="email"
								id="email"
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								placeholder="name@company.com"
							/>
							<ErrorMessage
								name="email"
								component="div"
								className="text-red-500 text-sm"
							/>
						</div>
						<div>
							<label
								htmlFor="password"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Votre mot de passe
							</label>
							<Field
								type="password"
								name="password"
								id="password"
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								placeholder="••••••••"
							/>
							<ErrorMessage
								name="password"
								component="div"
								className="text-red-500 text-sm"
							/>
						</div>
						<div className="flex items-end justify-end">
							<Link
								to="/create-acount"
								className="text-[#039875] hover:font-bold w-full text-center justify-end"
							>
								Créer un nouveau compte utilisateur
							</Link>
						</div>
						<button
							type="submit"
							disabled={isLeading2}
							className="flex justify-center bg-[#039875] hover:bg-[#01a57f] w-full py-2 rounded-full shadow-sm text-white text-center hover:shadow-md"
						>
							{isLeading2 && (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="animate-spin h-5 w-5 mr-3"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
									/>
								</svg>
							)}
							{isLeading2 ? "login en cours ..." : `Login`}
						</button>
					</Form>
				</Formik>
			</div>
		</div>
	);
};

export default Login;
