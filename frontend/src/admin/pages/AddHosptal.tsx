import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ContentAdmin from "./../components/ContentAdmin";
import getMainUrlApi from "../../utils/getMainUrlApi";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";

const ValidationSchema = Yup.object().shape({
	pseudo: Yup.string().required("Le nom de l'hopital est requis"),
	email: Yup.string()
		.required("L'adresse e-mail est requise")
		.email()
		.min(4, "L'e-mail doit avoir min 4 caractères"),
	latitude: Yup.number()
		.required("La latitude est requise")
		.min(5, "min 5 caractères"),
	longitude: Yup.number()
		.required("La longitude est requise")
		.min(5, "min 5 caractères"),
});

const AddHospital = () => {
	localStorage.setItem("page", "Ajout des hopitaux dans la base de données");
	axios.defaults.withCredentials = true;
	window.document.title = "Ajout des hopitaux dans la base de données";

	const [loading, setLoading] = useState<boolean>(false);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleSubmit = async (
		values: unknown,
		{ resetForm }: { resetForm: () => void }
	) => {
		console.log(values);
		setLoading(true);
		try {
			const response = await axios.post(
				`${getMainUrlApi()}hospitals/add-hopital/`,
				values
			);
			toast.info(
				response?.data?.message?.name ??
					"Duplication du champ email et/ou nom de l'hopital",
				{
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: 1,
					theme: "light",
				}
			);
			resetForm(); // Réinitialise le formulaire après une soumission réussie
		} catch (error) {
			console.error("Error during submission:", error);
			toast.error(`${error ?? "Erreur"}🫡`, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: 1,
				theme: "light",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<ContentAdmin>
			<ToastContainer />
			<div className="w-1/2 mx-auto p-4">
				<div className="w-full p-6 rounded-md shadow-md bg-white">
					<h2 className="text-2xl my-4 font-semibold mb-4 text-gray-600">
						Ajout des hopitaux
					</h2>
					<Formik
						initialValues={{
							pseudo: "",
							email: "",
							latitude: "",
							longitude: "",
						}}
						validationSchema={ValidationSchema}
						onSubmit={handleSubmit}
					>
						<Form>
							<div className="flex justify-between">
								<div className="mb-4 mr-2 w-full">
									<label
										htmlFor="pseudo"
										className="block w-full text-sm font-medium text-gray-700"
									>
										Nom de l'hopital
									</label>
									<Field
										type="text"
										id="pseudo"
										name="pseudo"
										placeholder="Nom de l'hopital"
										className="mt-1 p-2 w-full border rounded-md"
									/>
									<ErrorMessage
										name="pseudo"
										component="div"
										className="text-red-500 text-sm"
									/>
								</div>
								<div className="mb-4 w-full">
									<label
										htmlFor="email"
										className="block text-sm font-medium text-gray-700"
									>
										Email
									</label>
									<Field
										type="email"
										id="email"
										name="email"
										placeholder="E-mail"
										className="mt-1 p-2 w-full border border-gray-500 rounded-md"
									/>
									<ErrorMessage
										name="email"
										component="div"
										className="text-red-500 text-sm"
									/>
								</div>
							</div>

							<div className="flex justify-between mt-4">
								<div className="mb-4 mr-2 w-full">
									<label
										htmlFor="latitude"
										className="block text-sm font-medium text-gray-700"
									>
										Latitude
									</label>
									<Field
										id="latitude"
										name="latitude"
										placeholder="Latitude"
										className="mt-1 p-2 w-full border rounded-md border-gray-600"
									/>
									<ErrorMessage
										name="latitude"
										component="div"
										className="text-red-500 text-sm"
									/>
								</div>
								<div className="mb-4 mr-2 w-full">
									<label
										htmlFor="longitude"
										className="block text-sm font-medium text-gray-700"
									>
										Longitude
									</label>
									<Field
										id="longitude"
										name="longitude"
										placeholder="Longitude"
										className="mt-1 p-2 w-full border rounded-md border-gray-600"
									/>
									<ErrorMessage
										name="longitude"
										component="div"
										className="text-red-500 text-sm"
									/>
								</div>
							</div>
							<button
								type="submit"
								className="px-4 py-2.5 bg-blue-400 text-white rounded-md hover:bg-blue-600 transition-all duration-200 w-full"
								disabled={loading}
							>
								{!loading
									? "Ajouter"
									: "Enregistrement en cours ..."}
							</button>
						</Form>
					</Formik>
				</div>
			</div>
		</ContentAdmin>
	);
};

export default AddHospital;
