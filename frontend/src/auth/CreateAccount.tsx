import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const CreateAccount = () => {
	window.document.title = "Sing-Up";

	const validationSchemaForm = Yup.object().shape({
		name: Yup.string()
			.matches(/^[a-zA-Z\s]+$/, "Le nom ne doit contenir que des lettres")
			.min(5, "Le nom doit comporter au moins 5 caractères")
			.max(15, "Le nom ne peut pas dépasser 15 caractères")
			.required("Champ requis"),
		email: Yup.string()
			.max(50)
			.lowercase()
			.email("Adresse e-mail invalide")
			.matches(
				/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
				"Adresse e-mail invalide"
			)
			.required("Champ requis"),
		numero: Yup.string()
			.required("Champ requis")
			.matches(
				/^(?:243|250|256|257|255|242|254|244)?(?:80|81|82|83|84|85|89|90|91|92|93|94|95|96|97|98|99)\d{7}$/,
				"Le téléphone doit commencer par 243 et suivre par 81, 82, 80, 89, 99 ou 97, et contenir en tout 12 chiffres"
			),
		password: Yup.string()
			.required("Le mot de passe est requis")
			.min(6, "Le mot de passe doit contenir au moins 12 caractères")
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~]).*$/,
				"Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial"
			),
		confirmPassword: Yup.string()
			.oneOf(
				[Yup.ref("password"), null],
				"Les mots de passe ne correspondent pas"
			)
			.required("Ce champ est requis"),
	});

	const initialFormData = {
		name: "",
		email: "",
		numero: "",
		password: "",
		confirmPassword: "",
	};

	const [error] = useState("");
	const [isLeading2, setIsLeading2] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = (values, { resetForm }) => {
		setIsLeading2(true);
		axios
			.post(`localhost:2000/api/v1/pharmaciens/create-account`, values)
			.then((response) => {
				toast.info(`${response.data.message}`, {
					position: "bottom-right",
					autoClose: 10000,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: true,
					draggable: false,
					progress: "1",
					theme: "colored",
				});
				resetForm();
				navigate("/login");
				setIsLeading2(false);
			})
			.catch((error) => {
				toast.error(`Erreur: ${error?.response?.data?.message};`, {
					position: "bottom-right",
					autoClose: 10000,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: true,
					draggable: true,
					progress: "1",
					theme: "colored",
				});
				setIsLeading2(false);
			});
	};

	return (
		<div className="h-screen w-full flex justify-center items-center">
			<div className="absolute top left-0 right-0 h-[60vh] w-full bg-gradient-to-br from-[#95d8c8] to-slate-50 blur-xl opacity-10 shadow-slate-50 shadow-2xl -z-10" />
			<div className="w-1/2 flex justify-center items-center h-screen- min-h-screen- max-h-screen my-5 z-50">
				<ToastContainer />
				<Formik
					initialValues={initialFormData}
					validationSchema={validationSchemaForm}
					onSubmit={handleSubmit}
				>
					{({ isSubmitting, errors, touched }) => (
						<Form className="max-w-full sm:mx-5 w-11/12 md:w-1/2 bg-white rounded px-3 py-3">
							<h3 className="text-center text-xl text-[#039875] font-bold">
								Creation du compte
							</h3>
							<div className="mb-2">
								<label
									className="text-left block text-[#039875] text-sm font-bold mb-2"
									htmlFor="name"
								>
									Pseudo
								</label>
								<Field
									className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline  focus:ring-1 ${
										errors.message && touched.message
											? "border-red-500 focus:border-red-500 focus:ring-red-500"
											: "border-[#039875] focus:border-[#19c29a] focus:ring-[#0fc59b]"
									}`}
									id="name"
									type="text"
									placeholder="Votre pseudo"
									name="name"
								/>
								<ErrorMessage
									name="name"
									component="div"
									className="text-red-500"
								/>
							</div>

							<div className="md:mb-2">
								<label
									className="text-left block text-[#039875] text-sm font-bold mb-2"
									htmlFor="numero"
								>
									Numero de telephone
								</label>
								<Field
									className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline  focus:ring-1 ${
										errors.message && touched.message
											? "border-red-500 focus:border-red-500 focus:ring-red-500"
											: "border-[#039875] focus:border-[#19c29a] focus:ring-[#0fc59b]"
									}`}
									id="numero"
									type="text"
									placeholder="243 000 000 000"
									name="numero"
								/>
								<ErrorMessage
									name="numero"
									component="div"
									className="text-red-500"
								/>
							</div>

							<div className="md:mb-2">
								<label
									className="text-left block text-[#039875] text-sm font-bold mb-2"
									htmlFor="email"
								>
									Adresse e-mail
								</label>
								<Field
									className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline  focus:ring-1 ${
										errors.message && touched.message
											? "border-red-500 focus:border-red-500 focus:ring-red-500"
											: "border-[#039875] focus:border-[#19c29a] focus:ring-[#0fc59b]"
									}`}
									id="email"
									type="email"
									placeholder="example@example.com"
									name="email"
								/>
								<ErrorMessage
									name="email"
									component="div"
									className="text-red-500"
								/>
							</div>

							<div className="md:mb-2">
								<label
									className="text-left block text-[#039875] text-sm font-bold mb-2"
									htmlFor="password"
								>
									Mot de passe
								</label>
								<Field
									className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline  focus:ring-1 ${
										errors.message && touched.message
											? "border-red-500 focus:border-red-500 focus:ring-red-500"
											: "border-[#039875] focus:border-[#19c29a] focus:ring-[#0fc59b]"
									}`}
									id="password"
									type="password"
									placeholder="********"
									name="password"
								/>
								<ErrorMessage
									name="password"
									component="div"
									className="text-red-500"
								/>
							</div>
							<div className="mb-4">
								<label
									className="text-left block text-[#039875] text-sm font-bold mb-2"
									htmlFor="confirmPassword"
								>
									Confirmer le mot de passe
								</label>
								<Field
									className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline  focus:ring-1 ${
										errors?.message && touched?.message
											? "border-red-500 focus:border-red-500 focus:ring-red-500"
											: "border-[#039875] focus:border-[#19c29a] focus:ring-[#0fc59b]"
									}`}
									id="confirmPassword"
									type="password"
									placeholder="********"
									name="confirmPassword"
								/>
								<ErrorMessage
									name="confirmPassword"
									component="div"
									className="text-red-500"
								/>
							</div>
							{error && (
								<p className="text-red-500 text-center my-1">
									{error}
								</p>
							)}
							<div className=" my-1">
								<button
									onSubmit={handleSubmit}
									disabled={isLeading2}
									type="submit"
									className="bg-[#039875] flex justify-center items-center hover:bg-[#0fad89] w-full py-2 rounded-full shadow-sm text-white text-center"
								>
									{isLeading2 && isSubmitting && (
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
									{isLeading2
										? "Inscription encours ..."
										: `S'inscrire`}
								</button>
							</div>

							<div className="flex justify-center items-center">
								<Link
									to="/"
									className="text-[#039875] w-full text-center mt-1 hover:text-[#179275] hover:font-bold"
								>
									{`j'ai deja un compte`}
								</Link>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default CreateAccount;
